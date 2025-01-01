import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./slices/authSlice";
import {
  mainApi,
  searchApi,
  instagramApi,
  mainImageApi,
  mainCardApi,
  sliderApi,
} from "./api/mainApiSlice";
import { userApi } from "./api/mainApiSlice";
import homeItems from "./slices/homeItemsSlice";
import searchSlice from "./slices/searchSlice";
import cartSlice from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    userAuth: userAuth,
    searchSlice: searchSlice,
    homeItems: homeItems,
    cartSlice,
    [userApi.reducerPath]: userApi.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
    [mainImageApi.reducerPath]: mainImageApi.reducer,
    [sliderApi.reducerPath]: sliderApi.reducer,
    [mainCardApi.reducerPath]: mainCardApi.reducer,

    [searchApi.reducerPath]: searchApi.reducer,
    [instagramApi.reducerPath]: instagramApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      mainApi.middleware,

      mainImageApi.middleware,
      searchApi.middleware,
      mainCardApi.middleware,
      sliderApi.middleware,
      instagramApi.middleware,
    ), // добавление api.middleware
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
