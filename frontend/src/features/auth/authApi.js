// features/auth/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create an API slice for authentication
export const authApi = createApi({
  reducerPath: 'authApi', // Custom reducer path for authentication
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Replace with your backend API URL
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userInfo,
      }),
    }),
    logout: builder.mutation({

      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

// Export the auto-generated hooks for login, signup, and logout
export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authApi;
