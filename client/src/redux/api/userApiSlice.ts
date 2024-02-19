// Custom Imports
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        return {
          url: "admin/get-users",
          method: "GET",
        };
      },
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (data) => {
        return {
          url: "admin/create-user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (data) => {
        return {
          url: "admin/delete-user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: "admin/update-user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
