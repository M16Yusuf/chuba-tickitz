import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
  genres: [],
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  error: null,
};

const getMovieThunk = createAsyncThunk(
  "movies/get_data",
  async (urlParam, { rejectWithValue }) => {
    console.log(urlParam)
    try {
      // new data fetch form backend
      const responMovies = await axios({
        method: "GET",
        ...urlParam,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(responMovies);

      const responGenres = await axios.request({
        url: `${import.meta.env.VITE_TMDB_API_URL}/genre/movie/list?language=en`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        }
      });

      // process data before return to extrareducer
      // process genres, change genre_ids to name
      const { data: { data: resultMovies }, } = responMovies;
      const { data: { genres: resultGenres }, } = responGenres;

      return { resultMovies, resultGenres };
    } catch (err) {
      return (rejectWithValue(err));
    }
  }
)

const movieSlice = createSlice({
  initialState,
  name: "movies",
  extraReducers: (builder) =>
    builder
      .addCase(getMovieThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getMovieThunk.fulfilled, (state, { payload }) => {
        state.movies = payload.resultMovies;
        state.genres = payload.resultGenres;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getMovieThunk.rejected, (state, { payload, error }) => {
        state.error = {
          payload,
          error,
        }
        state.isLoading = false;
        state.isFailed = true;
      })
});

export const movieActions = {
  ...movieSlice.actions,
  getMovieThunk,
}

export default movieSlice.reducer;