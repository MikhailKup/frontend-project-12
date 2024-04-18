import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveModal, setActiveModal } from '../../slices/ui';
import getModal from '../modals/index';
import SingleChannel from './SingleChannel';

const ChannelList = ({ data }) => {
  const { t } = useTranslation();
  const activeModal = useSelector(selectActiveModal);
  const dispatch = useDispatch();

  const channelNames = data.map((c) => c.name);
  const showModal = (type, item = null) => {
    dispatch(setActiveModal({ type, item }));
  };

  const renderModal = () => {
    if (!activeModal.type) {
      return null;
    }
    const Modal = getModal(activeModal.type);
    return <Modal />;
  };

  return (
    <>
      <div className="d-flex bg-secondary rounded border-3 border-bottom border-end border-primary justify-content-between mb-2 ps-3 pe-2 p-4">
        <b className="mt-2">{t('mainPage.channels')}</b>
        <Button
          name="addChannel"
          variant="link"
          onClick={() => showModal('adding', { channelNames })}
          className="p-0 text-dark"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-patch-plus"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5
              0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"
            />
            <path
              d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1
              2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89
              2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134
              0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89
              0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1
              4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016
              1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89
              1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0
              0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"
            />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav
        as="ul"
        className="overflow-auto h-100 nav-fill nav-pills d-block mb-3 px-2"
      >
        {data.map((channel) => (
          <SingleChannel
            key={channel.id}
            channel={channel}
            showModal={showModal}
            channelNames={channelNames}
          />
        ))}
      </Nav>
      {renderModal()}
    </>
  );
};

export default ChannelList;
