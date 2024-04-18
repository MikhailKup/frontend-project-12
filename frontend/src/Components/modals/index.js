import AddingChannelModal from './AddingChannel';
import EditingChannelModal from './EditingChannel';
import RemovingChannelModal from './RemovingChannel';

const mapping = {
  adding: AddingChannelModal,
  editing: EditingChannelModal,
  removing: RemovingChannelModal,
};

export default (type) => mapping[type];
