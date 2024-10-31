import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./slices/authSlice";
import { mainApi, searchApi } from "./api/mainApiSlice";
import { userApi } from "./api/mainApiSlice";
export const store = configureStore({
  reducer: {
    userAuth: userAuth,
    [userApi.reducerPath]: userApi.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      mainApi.middleware,
      searchApi.middleware
    ), // добавление api.middleware
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
