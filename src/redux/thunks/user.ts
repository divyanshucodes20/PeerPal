import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { server } from "../../constants/config"

export const userSignup = createAsyncThunk("user/signup", async (formData: FormData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${server}/api/v1/user/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return data
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})

export const userLogin = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${server}/api/v1/user/login`, credentials)
      return data
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  },
)

export const verifyOTP = createAsyncThunk(
  "user/verifyOTP",
  async (verificationData: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${server}/api/v1/user/verify`, verificationData)
      return data
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  },
)
export const resendOTP = createAsyncThunk(
  "user/resendOTP",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${server}/api/v1/user/resend-otp`, { email })
      return data
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  },
)

export const userLogout = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${server}/api/v1/user/logout`)
    return data
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})

