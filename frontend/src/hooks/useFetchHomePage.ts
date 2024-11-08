// hooks/useFetchData.ts
import { useLazyMainSectionFetchQuery } from "../redux/api/mainApiSlice";
import { useEffect } from "react";
import useFetchOnView from "./useFetchOnView";
import { useAppDispatch } from "../redux/hook";
import {
  setFeaturedAccessories,
  setFeaturedItems,
  setTrendingItems,
} from "../redux/slices/homeItemsSlice";

export const useFetchHomePage = (section: string, setData: Function) => {
  const [fetchData, { data, isLoading }] = useLazyMainSectionFetchQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data, setData]);

  useEffect(() => {
    console.log("SECTIONNAME", section, "DATA", data);
    if (data) {
      if (data.title === "Trending Items") {
        dispatch(setTrendingItems(data));
      }
      if (data.title === "Featured Apparel Items") {
        dispatch(setFeaturedItems(data));
      }
      if (data.title === "Featured Accessories Items") {
        dispatch(setFeaturedAccessories(data));
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
      threshold: 1,
      page: null,
      triggerOnce: true,
    }),
  };
};
