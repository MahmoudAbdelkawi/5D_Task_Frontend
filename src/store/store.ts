import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersApi from "../api/usersApi";

const RootReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
});
export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(usersApi.middleware);
  },
});
