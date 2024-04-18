import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import { getChannels } from '../../services/channelsApi';
import MainSpinner from '../Spinner';
import ChannelList from './ChannelList';
import useAuth from '../../hooks/useAuth';

const ChannelBox = () => {
  const { data, isLoading, error } = getChannels();
  const { logOut } = useAuth();

  useEffect(() => {
    if (error?.status === 401) {
      logOut();
    }
  }, [error?.status, logOut]);

  return (
    <Col className="px-0 border-end d-flex flex-column border-primary h-100 col-4" md="2">
      {isLoading
        ? <MainSpinner />
        : <ChannelList data={data} error={error} />}
    </Col>
  );
};

export default ChannelBox;
