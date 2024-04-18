import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveChannelId, setActiveChannelId } from '../../slices/ui';

const SingleChannel = ({ channel, showModal, channelNames }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const activeChannelId = useSelector(selectActiveChannelId);
  const { name, id, removable } = channel;

  const handleClick = () => {
    dispatch(setActiveChannelId({ id }));
  };

  const isActive = activeChannelId === id;

  const builder = () => {
    const chnl = (
      <Button
        variant={isActive ? 'secondary' : null}
        onClick={handleClick}
        className={['w-100', 'rounded-0', 'text-start', 'text-truncate']}
      >
        <span className="me-1"># </span>
        {name}
      </Button>
    );
    if (!removable) {
      return chnl;
    }

    return (
      <Dropdown className="d-flex" as={ButtonGroup}>
        {chnl}
        <Dropdown.Toggle
          variant={isActive ? 'secondary' : null}
          id={`channel-control-${id}`}
        >
          <span className="visually-hidden">
            {t('mainPage.channelControl')}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => showModal('removing', { id })}>
            {t('mainPage.modals.remove')}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => showModal('editing', { id, name, channelNames })}
          >
            {t('mainPage.modals.edit')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <Nav.Item key={id} as="li" className="w-100">
      {builder()}
    </Nav.Item>
  );
};

export default SingleChannel;
