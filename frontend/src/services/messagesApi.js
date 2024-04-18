import { createApi } from '@reduxjs/toolkit/query/react';
import routes from '../routes';
import baseQuery from './baseQuery';

const { apiPaths } = routes;

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery,
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => apiPaths.messagesPath(),
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: apiPaths.messagesPath(),
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi;

export {
  useGetMessagesQuery as getMessages,
  useAddMessageMutation as addMessage,
};
