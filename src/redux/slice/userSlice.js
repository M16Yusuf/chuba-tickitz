import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  error: null,
};

const getUserThunk = createAsyncThunk(
  "get/profile",
  async (token, { rejectWithValue }) => {
    try {
      const responseData = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_HOST_URL}/users`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      const { data: { data: resultData } } = responseData
      return { resultData }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const userSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    deleteUserState: (state) => {
      state.user = {};
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailed = false;
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload.resultData
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUserThunk.rejected, (state, { payload, error }) => {
        state.error = {
          payload,
          error
        }
        state.isLoading = false;
        state.isFailed = true;
      })
});

export const userAction = {
  ...userSlice.actions,
  getUserThunk
};
export default userSlice.reducer;