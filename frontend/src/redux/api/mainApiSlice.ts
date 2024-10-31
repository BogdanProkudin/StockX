import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Создаем API-сервис
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003" }),
  endpoints: (builder) => ({
    userSectionFetch: builder.query({
      query: () => "/getShoes",
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useUserSectionFetchQuery } = userApi;

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003" }),
  endpoints: (builder) => ({
    mainSectionFetch: builder.query({
      query: (section: string) => `/getMainSection/${section}`,
      keepUnusedDataFor: 60,
    }),
  }),
});
export const { useMainSectionFetchQuery, useLazyMainSectionFetchQuery } =
  mainApi;
export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003" }),
  endpoints: (builder) => ({
    searchItems: builder.query({
      query: (searchingValue: string) => `/searchItems/${searchingValue}`,
      keepUnusedDataFor: 60,
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const { useLazySearchItemsQuery } = searchApi;
