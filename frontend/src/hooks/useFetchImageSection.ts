// hooks/useFetchData.ts
import { useLazyImageSectionFetchQuery } from "../redux/api/mainApiSlice";
import { useEffect } from "react";
import useFetchOnView from "./useFetchOnView";
import { useAppDispatch } from "../redux/hook";
import {
  setBrowseImage,
  setHolidayImage,
  setPopularImage,
  setSeasonalImage,
} from "../redux/slices/homeItemsSlice";

export const useFetchImageSection = (section: string) => {
  const [fetchData, { data, isLoading }] = useLazyImageSectionFetchQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      if (data.title === "Popular Brands") {
        dispatch(setPopularImage(data));
      }
      if (data.title === "Holiday Gift Guides") {
        dispatch(setHolidayImage(data));
      }
      if (data.title === "Seasonal Favorites") {
        dispatch(setSeasonalImage(data));
      }
      if (data.title === "Browse More Brands") {
        dispatch(setBrowseImage(data));
      }
    }
  }, [section, data]);

  return {
    fetchData,
    data,
    isLoading,
    ref: useFetchOnView({
      fetchFunction: fetchData,
      sectionName: section,
      threshold: 0.2,
      page: null,
      triggerOnce: true,
    }),
  };
};
