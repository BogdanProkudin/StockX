import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Создаем API-сервис
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003" }),
  endpoints: (builder) => ({
    userSectionFetch: builder.query({
      query: () => "/getShoes", // Укажите URL эндпоинта
      keepUnusedDataFor: 60,
      // Не перезапрашиваем данные при каждом монтировании, если они уже есть в кэше
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
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

// Экспортируем хуки для использования в компонентах
export const { useMainSectionFetchQuery, useLazyMainSectionFetchQuery } =
  mainApi;
