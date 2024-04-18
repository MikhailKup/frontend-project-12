import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { useFormik } from 'formik';
import * as censor from 'leo-profanity';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import useAuth from '../../hooks/useAuth';
import { getChannels } from '../../services/channelsApi';
import { addMessage, getMessages } from '../../services/messagesApi';
import { selectActiveChannelId } from '../../slices/ui';
import MainSpinner from '../Spinner';
import Messages from './Messages';

const MessageBox = () => {
  const { t } = useTranslation();
  const {
    user: { username },
  } = useAuth();
  const { data, isLoading } = getMessages();
  const { data: channels } = getChannels();
  const [addMessageFunc] = addMessage();
  const [messagesCount, setMessagesCount] = useState(0);
  const inputRef = useRef(null);
  const activeChannelId = useSelector(selectActiveChannelId);

  const formikObj = useFormik({
    initialValues: { message: '' },
    onSubmit: (values) => {
      const msgObj = {
        body: censor.clean(values.message),
        channelId: activeChannelId,
        username,
      };
      addMessageFunc(msgObj)
        .unwrap()
        .then(() => {
          formikObj.resetForm();
        })
        .catch(() => {
          toast.error(t('unknownError'));
        });
    },
  });
  const currentMessages = data?.filter((m) => m.channelId === activeChannelId) ?? [];

  useEffect(() => {
    inputRef.current.focus();
    setMessagesCount(currentMessages.length);
  }, [activeChannelId, currentMessages.length]);

  const messagesRender = () => {
    if (isLoading) {
      return <MainSpinner />;
    }
    if (data.length === 0) {
      return null;
    }

    return <Messages messages={currentMessages} />;
  };

  const channelName = channels?.find((c) => c.id === activeChannelId)?.name;
  return (
    <Col className="p-0 h-100">
      <div className="d-flex h-100 flex-column">
        <div className="chat bg-secondary rounded p-3 pe-2 ">
          <p className="m-0">
            <b>{`# ${channelName}`}</b>
          </p>
          <span className="text-muted">
            {t('mainPage.messages.counter.count', { count: messagesCount })}
          </span>
        </div>
        {messagesRender()}
        <div className="py-3 px-5 mt-auto">
          <Form onSubmit={formikObj.handleSubmit}>
            <Form.Group className="d-flex">
              <Form.Control
                aria-label="Новое сообщение"
                onChange={formikObj.handleChange}
                value={formikObj.values.message}
                type="text"
                placeholder={t('mainPage.messages.input')}
                id="message"
                ref={inputRef}
                required
              />
              <Button
                type="submit"
                variant="outline-dark"
                size="sm"
                className="border-dark rounded-end border-2 ms-2 pb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart-arrow"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.707 9h4.364c-.536 1.573 2.028 3.806 4.929-.5-2.9-4.306-5.465-2.073-4.929-.5H6.707L4.854 6.146a.5.5 0 1 0-.708.708L5.293 8h-.586L2.854 6.146a.5.5 0 1 0-.708.708L3.293 8h-.586L.854 6.146a.5.5 0 1 0-.708.708L1.793 8.5.146 10.146a.5.5 0 0 0 .708.708L2.707 9h.586l-1.147 1.146a.5.5 0 0 0 .708.708L4.707 9h.586l-1.147 1.146a.5.5 0 0 0 .708.708z" />
                </svg>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default MessageBox;
