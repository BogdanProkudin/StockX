import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./slices/authSlice";
import homeItems from "./slices/homeItemsSlice";
export const store = configureStore({
  reducer: {
    userAuth: userAuth,
    homeItems,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
