import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ============================= { Login slice and thunk } ============================= 
const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  justLoggedIn: false,
  error: null,
}

const postLoginThunk = createAsyncThunk(
  "auth/login",
  async (dataBody, { rejectWithValue }) => {
    try {
      const responseData = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_HOST_URL}/auth`,
        data: dataBody,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { data: resultData } = responseData
      return { resultData }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    resetAuthState: (state) => {
      state.user = {};
      state.registerStatus = {};
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailed = false;
      state.error = null;
    },
    clearJustLoggedIn: (state) => {
      state.justLoggedIn = false
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(postLoginThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.justLoggedIn = false;
        state.error = null;
      })
      .addCase(postLoginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.resultData
        state.isLoading = false;
        state.justLoggedIn = true;
        state.isSuccess = true;
      })
      .addCase(postLoginThunk.rejected, (state, { payload, error }) => {
        state.error = {
          payload,
          error
        }
        state.isLoading = false;
        state.isFailed = true;
      })
})

export const authReducer = authSlice.reducer
export const authAction = {
  ...authSlice.actions,
  postLoginThunk
}

// ============================= { Register slice and thunk } ============================= 
const initRegisState = {
  status: {},
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  error: null,
}

const postRegisterThunk = createAsyncThunk(
  "auth/register",
  async (dataBody, { rejectWithValue }) => {
    try {
      const responseData = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_HOST_URL}/auth/register`,
        data: dataBody,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // destructuring 
      const { data: resultRegData } = responseData
      console.log(resultRegData)
      return { resultRegData }
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const authRegSlice = createSlice({
  initialState: initRegisState,
  name: "reg_status",
  reducers: {
    resetRegisterState: (state) => {
      state.status = {};
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailed = false;
      state.error = null;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(postRegisterThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(postRegisterThunk.fulfilled, (state, { payload }) => {
        state.status = payload.resultRegData;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(postRegisterThunk.rejected, (state, { payload, error }) => {
        state.error = {
          payload,
          error,
        }
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      })
})

export const regStatusReducer = authRegSlice.reducer
export const authRegAction = {
  ...authRegSlice.actions,
  postRegisterThunk
}