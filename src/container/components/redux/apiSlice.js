import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://url....',
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: '/signup',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    registerMember: builder.mutation({
      query: (data) => ({
        url: '/members',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    getAllMembers: builder.query({
      query: () => '/members',
      credentials: 'include',
    }),
    getMember: builder.query({
      query: (data) => ({
        url: '/member/:id',
        method: 'GET',
        body: data,
        credentials: 'include',
      }),
    }),

    updateMember: builder.mutation({
      query: (data) => ({
        url: '/member/:id',
        method: 'PATCH',
        body: data,
        credentials: 'include',
      }),
    }),
    deleteMember: builder.mutation({
      query: (id) => ({
        url: `/member/${id}`,
        method: 'DELETE',
        body: id,
        credentials: 'include',
      }),
    }),

    verifyToken: builder.query({
      query: () => '/verify-token',
    }),
  }),
});

export const {
  useDeleteMemberMutation,
  useGetMemberQuery,
  useGetAllMembersQuery,
  useUpdateMemberMutation,
  useSignupMutation,
  useLoginMutation,
  useRegisterMemberMutation,
  useVerifyTokenQuery,
} = apiSlice;
