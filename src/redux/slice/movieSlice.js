import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
  genres: [],
  isLoadMovie: false,
  isLoadGenre: false,
  isSuccess: false,
  isFailed: false,
  error: null,
};

const getMovieThunk = createAsyncThunk(
  "movies/get_data",
  async (urlParam, { rejectWithValue }) => {
    try {
      // new data fetch form backend
      const responMovies = await axios({
        method: "GET",
        ...urlParam,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data: { data: resultMovies }, } = responMovies;
      return { resultMovies };
    } catch (err) {
      return (rejectWithValue(err));
    }
  }
)

const getGenreThunk = createAsyncThunk(
  "movies/get_genres",
  async (_, { rejectWithValue }) => {
    try {
      const responGenres = await axios.request({
        url: `${import.meta.env.VITE_HOST_URL}/movies/genres`,
        headers: {
          accept: 'application/json',
        }
      });
      const { data: { data: resultGenres }, } = responGenres;
      return { resultGenres };
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const movieSlice = createSlice({
  initialState,
  name: "movies",
  extraReducers: (builder) =>
    builder
      // =========================== Get Filtered Movies ===========================
      .addCase(getMovieThunk.pending, (state) => {
        state.isLoadMovie = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getMovieThunk.fulfilled, (state, { payload }) => {
        state.movies = payload.resultMovies;
        state.isLoadMovie = false;
        state.isSuccess = true;
      })
      .addCase(getMovieThunk.rejected, (state, { payload, error }) => {
        state.error = {
          payload,
          error,
        }
        state.isLoadMovie = false;
        state.isFailed = true;
      })
      // =========================== Get all genres ===========================
      .addCase(getGenreThunk.pending, (state) => {
        state.isLoadGenre = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getGenreThunk.fulfilled, (state, { payload }) => {
        state.genres = payload.resultGenres;
        state.isLoadGenre = false;
        state.isSuccess = true;
      })
      .addCase(getGenreThunk.rejected, (state, { payload, error }) => {
        state.error = {
          payload,
          error,
        }
        state.isLoadGenre = false;
        state.isFailed = true;
      })

});

export const movieActions = {
  ...movieSlice.actions,
  getMovieThunk, getGenreThunk
}

export default movieSlice.reducer;