import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    userAuth: userAuth,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
