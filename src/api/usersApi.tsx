import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../Config/config";
import { User, UserResponse } from "../Interfaces/User";

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query) => ({
        url: `/Users?${query}`,
      }),
      providesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: (body) => ({
        url: "/Users",
        method: "POST",
        body,
        headers : { "Content-Type": "multipart/form-data" }
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/Users/${id}`,
        method: "PUT",
        body,
        headers : { "Content-Type": "multipart/form-data" }
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/Users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery,useAddUserMutation,useDeleteUserMutation,useUpdateUserMutation } = usersApi;
export default usersApi;
