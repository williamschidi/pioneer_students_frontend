import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearUser, setUsername } from './userSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pioneer-students-backend.onrender.com/api/v1',
    // baseUrl: 'http://localhost:3003/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Admin'],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/admin/login',
        method: 'POST',
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: '/admin/signup',
        method: 'POST',
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/admin/logout',
        method: 'POST',
      }),
    }),
    protected: builder.query({
      query: () => '/register',
    }),
    registerMember: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Admin'],
      transformResponse: (response) => response,
    }),
    getMembers: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/register?page=${page}&limit=${limit}`,
      providesTags: ['Admin'],
    }),
    getMember: builder.query({
      query: (id) => `/register/${id}`,
      providesTags: ['Admin'],
    }),

    getSearchMembers: builder.query({
      query: (lastName) => `/register/search?lastName=${lastName}`,
      providesTags: ['Admin'],
    }),

    updateMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `/register/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Admin'],
      transformResponse: (response) => response,
    }),
    deleteMember: builder.mutation({
      query: (id) => ({
        url: `/register/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Admin'],
    }),

    getAllStates: builder.query({
      query: () => '/states',
    }),

    verifyToken: builder.query({
      query: () => '/admin/verify',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUsername(data.data.username));
        } catch (err) {
          dispatch(clearUser());
          err.message;
        }
      },
    }),
  }),
});

export const {
  useDeleteMemberMutation,
  useGetMemberQuery,
  useGetMembersQuery,
  useLazyGetSearchMembersQuery,
  useLazyGetMembersQuery,
  useGetAllStatesQuery,
  useUpdateMemberMutation,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMemberMutation,
  useVerifyTokenQuery,
  useProtectedQuery,
} = apiSlice;
