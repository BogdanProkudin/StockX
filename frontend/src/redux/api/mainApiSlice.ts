import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchResponse } from "../../types/searchTypes";

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
  tagTypes: ["SearchResults"],
  endpoints: (builder) => ({
    searchItems: builder.query({
      query: ({
        searchingValue,
        categoryQuery,
        brandQuery,
        genderQuery,
      }: {
        searchingValue: string;
        categoryQuery: string | undefined;
        brandQuery: string | undefined;
        genderQuery: string | undefined;
      }) => {
        let url = "/searchProducts";

        if (searchingValue && searchingValue.length > 0) {
          url += `/${encodeURIComponent(searchingValue)}`;
        } else {
          url += "/";
        }

        const queryParams = new URLSearchParams();

        if (categoryQuery) {
          queryParams.set("category", categoryQuery);
        }
        if (brandQuery) {
          queryParams.set("brand", brandQuery);
        }
        if (genderQuery) {
          queryParams.set("gender", genderQuery);
        }

        const queryString = queryParams.toString();
        const finalUrl = queryString ? `${url}?${queryString}` : url;

        return {
          url: finalUrl,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data,
          total: response.data.length,
          requestId: response.requestId,
          suggestionCountList: response.suggestionCountList,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ slug }: any) => ({
                type: "SearchResults" as const,
                id: slug,
              })),
              { type: "SearchResults", id: "LIST" },
            ]
          : [{ type: "SearchResults", id: "LIST" }],
      keepUnusedDataFor: 300,
      serializeQueryArgs: ({ queryArgs }) => {
        return JSON.stringify({
          search: queryArgs.searchingValue || "supreme",
          category: queryArgs.categoryQuery,
          brand: queryArgs.brandQuery,
          gender: queryArgs.genderQuery,
        });
      },
      merge: (currentCache, newItems) => {
        return newItems;
      },
      forceRefetch: ({ currentArg, previousArg, endpointState }) => {
        if (!previousArg || !endpointState?.data) return true;
        return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
      },
    }),
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
      query: ({
        searchingValue,
        categoryQuery,
        brandQuery,
        genderQuery,
        trendingQuery,
        page,
        colorQuery,
      }: {
        searchingValue: string;
        categoryQuery: string | undefined;
        brandQuery: string | undefined;
        page: number | undefined;
        genderQuery: string | undefined;
        trendingQuery: string | undefined;
        colorQuery: string | undefined;
      }) => {
        let url = "/searchProducts";

        if (searchingValue && searchingValue.length > 0) {
          url += `/${encodeURIComponent(searchingValue)}`;
        } else {
          url += "/all";
        }

        const queryParams = [];

        if (categoryQuery) {
          queryParams.push(`category=${encodeURIComponent(categoryQuery)}`);
        }
        if (page) {
          queryParams.push(`page=${encodeURIComponent(page)}`);
        }
        if (brandQuery) {
          queryParams.push(`brand=${encodeURIComponent(brandQuery)}`);
        }
        if (genderQuery) {
          queryParams.push(`gender=${encodeURIComponent(genderQuery)}`);
        }
        if (trendingQuery) {
          queryParams.push(`trending=${encodeURIComponent(trendingQuery)}`);
        }
        if (colorQuery) {
          queryParams.push(`color=${encodeURIComponent(colorQuery)}`);
        }
        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        console.log("Final URL:", url);
        return url;
      },
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
    searchCategoryItems: builder.query({
      query: ({
        searchQuery,
        categoryQuery,
      }: {
        searchQuery?: string;
        categoryQuery?: string;
      }) => {
        const params = new URLSearchParams();
        if (searchQuery) params.append("searchQuery", searchQuery);
        if (categoryQuery) params.append("categoryQuery", categoryQuery);
        return `/searchCategoryProduct?${params.toString()}`;
      },
      keepUnusedDataFor: 60,
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useLazySearchItemsQuery,
  useSearchItemsQuery,
  useLazySearchCategoryItemsQuery,
  useLazyLoadMoreItemsQuery,
} = searchApi;
