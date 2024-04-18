import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

const { apiPaths } = routes;

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credits) => ({
        url: apiPaths.loginPath(),
        body: credits,
        method: 'POST',
      }),
    }),
    signup: builder.mutation({
      query: (credits) => ({
        url: apiPaths.signupPath(),
        body: credits,
        method: 'POST',
      }),
    }),
  }),
});

const { useSignupMutation, useLoginMutation } = usersApi;

export { useLoginMutation as login, useSignupMutation as signup };
