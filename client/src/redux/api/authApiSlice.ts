// Custom Imports
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => {
        return {
          url: "users/signup",
          method: "POST",
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: "users/login",
          method: "POST",
          body: data,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: "users/forgotPassword",
          method: "POST",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ data, token }) => {
        return {
          url: `users/resetPassword/${token}`,
          method: "POST",
          body: data,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "users/updateMyPassword",
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApiSlice;
