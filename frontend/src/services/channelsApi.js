// eslint-disable-next-line no-unused-vars
import { createApi } from '@reduxjs/toolkit/query/react';
import routes from '../routes';
import baseQuery from './baseQuery';

const { apiPaths } = routes;

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery,
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => apiPaths.channelsPath(),
      providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: apiPaths.channelsPath(),
        body: channel,
        method: 'POST',
      }),
      invalidatesTags: ['Channels'],
    }),
    editChannel: builder.mutation({
      query: (channel) => {
        const { newName, channelId } = channel;
        return {
          url: apiPaths.channelPath(channelId),
          body: newName,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: (channelId) => ({
        url: apiPaths.channelPath(channelId),
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),
  }),
});

const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;

export {
  useAddChannelMutation as addChannel,
  useEditChannelMutation as editChannel,
  useGetChannelsQuery as getChannels,
  useRemoveChannelMutation as removeChannel,
};

export const defaultChannelId = 1;
