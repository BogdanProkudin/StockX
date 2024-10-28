import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Создаем API-сервис
export const shoesApi = createApi({
  reducerPath: "shoesApi",
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
export const { useUserSectionFetchQuery } = shoesApi;
