import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, adminLogout, getAdmin } from "../thunks/admin";
import { userLogin, userSignup, userLogout, verifyOTP } from "../thunks/user"
import toast from "react-hot-toast";

const initialState = {
  user: null,
  isAdmin: false,
  loader: true,
  isAuthenticated: false,
  isVerified:false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isAdmin = true;
        toast.success(action.payload);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isAdmin = false;
        toast.error(action.error.message);
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAdmin = true;
        } else {
          state.isAdmin = false;
        }
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.isAdmin = false;
      })
      .addCase(adminLogout.fulfilled, (state, action) => {
        state.isAdmin = false;
        toast.success(action.payload);
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.isAdmin = true;
        toast.error(action.error.message);
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isAuthenticated = true
        state.isVerified = false
        toast.success("Signup successfull! Please verify your email.")
      })
      .addCase(userSignup.rejected, (state, action) => {
        toast.error(action.error.message)
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isAuthenticated = true
        state.isVerified = action.payload.user.isVerified
        toast.success(`Welcome Back ${action.payload.user.name}`)
      })
      .addCase(userLogin.rejected, (state, action) => {
        toast.error(action.error.message)
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isVerified = true
        toast.success("Email verified successfully!")
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        toast.error(action.error.message)
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.isVerified = false
        toast.success("Logged out successfully")
      })
  },
});

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;
