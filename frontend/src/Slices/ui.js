import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeModal: { type: null, item: null },
    activeChannelId: '1',
  },
  reducers: {
    setActiveModal: (state, { payload: modal }) => {
      /* eslint-disable no-param-reassign */
      state.activeModal = modal;
    },
    setActiveChannelId: (state, { payload: { id } }) => {
      state.activeChannelId = id;
    },
  },
});

export const {
  setActiveChannelId,
  setActiveModal,
} = uiSlice.actions;

export default uiSlice.reducer;

export const selectActiveChannelId = (state) => state.ui.activeChannelId;
export const selectActiveModal = (state) => state.ui.activeModal;
