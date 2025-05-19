import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003/api/v1",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/admin/login",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/admin/signup",
        method: "POST",
        body: data,
      }),
    }),
    registerMember: builder.mutation({
      query: (data) => ({
        url: "/members",
        method: "POST",
        body: data,
      }),
    }),
    getAllMembers: builder.query({
      query: () => "/members",
    }),
    getMember: builder.query({
      query: ({ id, ...data }) => ({
        url: `/member/${id}`,
        method: "GET",
        body: data,
      }),
    }),

    updateMember: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/member/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteMember: builder.mutation({
      query: (id) => ({
        url: `/member/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),

    getAllStates: builder.query({
      query: () => "/states",
    }),

    verifyToken: builder.query({
      query: () => "/verify-token",
    }),
  }),
});

export const {
  useDeleteMemberMutation,
  useGetMemberQuery,
  useGetAllMembersQuery,
  useGetAllStatesQuery,
  useUpdateMemberMutation,
  useSignupMutation,
  useLoginMutation,
  useRegisterMemberMutation,
  useVerifyTokenQuery,
} = apiSlice;
