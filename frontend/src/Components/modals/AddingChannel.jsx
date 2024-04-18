import { useFormik } from 'formik';
import * as censor from 'leo-profanity';
import { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { addChannel } from '../../services/channelsApi';
import {
  selectActiveModal,
  setActiveChannelId,
  setActiveModal,
} from '../../slices/ui';

const AddingChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [addChannelFn, { isLoading }] = addChannel();
  const activeModal = useSelector(selectActiveModal);
  const channelNameSchema = Yup.object().shape({
    newChannel: Yup.string()
      .required(t('validationFeedback.required'))
      .min(3, t('validationFeedback.invalidLength'))
      .max(20, t('validationFeedback.invalidLength'))
      .notOneOf(activeModal.item.channelNames, t('mainPage.modals.notUnique')),
  });
  const hideModal = () => {
    dispatch(
      setActiveModal({
        type: null,
        item: null,
      }),
    );
  };

  const formik = useFormik({
    initialValues: {
      newChannel: '',
    },
    onSubmit: ({ newChannel }) => {
      addChannelFn({ name: censor.clean(newChannel) })
        .then((res) => {
          const { id } = res.data;
          dispatch(setActiveChannelId({ id }));
        })
        .then(() => {
          hideModal();
          toast.success(t('toast.channelCreated'));
          formik.resetForm();
        })
        .catch(() => {
          formik.setFieldError('newChannel', t('unknownError'));
        });
    },
    validationSchema: channelNameSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const { errors } = formik;

  const handleClose = () => {
    hideModal();
    formik.resetForm();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('mainPage.modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="newChannel" visuallyHidden>
              {t('mainPage.modals.channelName')}
            </Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.newChannel}
              className="mb-3"
              type="text"
              id="newChannel"
              name="newChannel"
              ref={inputRef}
              isInvalid={errors.newChannel}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.newChannel}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="outline-dark"
                onClick={handleClose}
              >
                {t('mainPage.modals.cancel')}
              </Button>
              <Button disabled={isLoading} type="submit">
                {t('mainPage.modals.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddingChannelModal;
