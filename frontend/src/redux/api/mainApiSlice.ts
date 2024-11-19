import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Создаем API-сервис
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003" }),
  endpoints: (builder) => ({
    userSectionFetch: builder.query({
      query: () => "/getUserSection",
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
      query: ({ sectionName }: { sectionName: string }) =>
        `/getCollectionSection/${sectionName}`,
      keepUnusedDataFor: 60,
    }),
  }),
});
export const { useMainSectionFetchQuery, useLazyMainSectionFetchQuery } =
  mainApi;
export const mainImageApi = createApi({
  reducerPath: "mainImageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003" }),
  endpoints: (builder) => ({
    imageSectionFetch: builder.query({
      query: ({ sectionName }: { sectionName: string }) =>
        `/getImageSection/${sectionName}`,
      keepUnusedDataFor: 60,
    }),
  }),
});
export const { useImageSectionFetchQuery, useLazyImageSectionFetchQuery } =
  mainImageApi;
export const mainCardApi = createApi({
  reducerPath: "mainCardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003" }),
  endpoints: (builder) => ({
    cardSectionFetch: builder.query({
      query: ({ sectionName }: { sectionName: string }) =>
        `/getCardSection/${sectionName}`,
      keepUnusedDataFor: 60,
    }),
  }),
});
export const { useCardSectionFetchQuery, useLazyCardSectionFetchQuery } =
  mainCardApi;
export const instagramApi = createApi({
  reducerPath: "instagramApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003" }),
  endpoints: (builder) => ({
    instagramSectionFetch: builder.query({
      query: () => "/getInstagramSection",
      keepUnusedDataFor: 60,
    }),
  }),
});
export const {
  useInstagramSectionFetchQuery,
  useLazyInstagramSectionFetchQuery,
} = instagramApi;

export const sliderApi = createApi({
  reducerPath: "sliderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003" }),
  endpoints: (builder) => ({
    sliderFetch: builder.query({
      query: ({ sectionName }: { sectionName: string }) =>
        `/getSliderInfo/${sectionName}`,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useSliderFetchQuery, useLazySliderFetchQuery } = sliderApi;
export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003" }),
  endpoints: (builder) => ({
    searchItems: builder.query({
      query: (searchingValue: string) => `/searchItems/${searchingValue}`,
      keepUnusedDataFor: 60,
    }),
    loadMoreItems: builder.query({
      query: ({
        sectionName,
        page,
      }: {
        sectionName: string;
        page: number | null;
      }) => `/loadMoreItems/${sectionName}/${page}`,
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useLazySearchItemsQuery,
  useSearchItemsQuery,
  useLazyLoadMoreItemsQuery,
} = searchApi;
