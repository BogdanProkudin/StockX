import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./slices/authSlice";
import homeItems from "./slices/homeItemsSlice";
import { shoesApi } from "./api/shoesApiSlice";
export const store = configureStore({
  reducer: {
    userAuth: userAuth,
    [shoesApi.reducerPath]: shoesApi.reducer,
    homeItems,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shoesApi.middleware), // добавление api.middleware
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
