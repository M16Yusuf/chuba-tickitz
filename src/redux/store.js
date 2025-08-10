import { combineReducers, configureStore } from "@reduxjs/toolkit";

// persist import
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

// imort slice
import movieReducer from "./slice/movieSlice";

const persistConfig = {
  key: "chuba-tickitz:redux",
  storage,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    movies: movieReducer,
  })
)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [PERSIST, REHYDRATE, REGISTER, FLUSH, PAUSE, PURGE],
      }
    })
  },
  devTools: import.meta.env.VITE_ENVIRONMENT === "development",
})

export const persistedStore = persistStore(store);
export default store;