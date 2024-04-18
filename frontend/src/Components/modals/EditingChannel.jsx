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
import { editChannel } from '../../services/channelsApi';
import { selectActiveModal, setActiveModal } from '../../slices/ui';

const EditingChannelModal = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const [editChannelFn, { isLoading }] = editChannel();
  const channelNameSchema = Yup.object().shape({
    newChannelName: Yup.string()
      .required(t('validationFeedback.required'))
      .min(3, t('validationFeedback.invalidLength'))
      .max(20, t('validationFeedback.invalidLength'))
      .notOneOf(activeModal.item.channelNames, t('mainPage.modals.notUnique')),
  });

  const { id, name } = activeModal.item;

  const hideModal = () => {
    dispatch(
      setActiveModal({
        type: null,
        item: null,
      }),
    );
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      newChannelName: name,
    },
    onSubmit: ({ newChannelName }) => {
      const channelObj = {
        newName: { name: censor.clean(newChannelName) },
        channelId: id,
      };
      editChannelFn(channelObj)
        .then(() => {
          hideModal();
          formik.resetForm();
          toast.success(t('toast.channelRenamed'));
        })
        .catch(() => {
          formik.setFieldError('newChannel', t('unknownError'));
        });
    },
    validationSchema: channelNameSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });
  const { errors } = formik;
  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleClose = () => {
    hideModal();
    formik.resetForm();
  };

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('mainPage.modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="newChannelName" visuallyHidden>
              {t('mainPage.modals.channelName')}
            </Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.newChannelName}
              className="mb-3"
              type="text"
              id="newChannelName"
              name="newChannelName"
              isInvalid={errors.newChannelName}
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid">
              {errors.newChannelName}
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

export default EditingChannelModal;
