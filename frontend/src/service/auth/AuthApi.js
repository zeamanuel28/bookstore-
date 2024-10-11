
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AuthApi = createApi({
  reducerPath: 'authApi', // Custom reducer path for authentication
   baseQuery: fetchBaseQuery({ baseUrl: '/http://localhost:5000/api' }),
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
export const { useLoginMutation, useSignupMutation, useLogoutMutation } = AuthApi;
