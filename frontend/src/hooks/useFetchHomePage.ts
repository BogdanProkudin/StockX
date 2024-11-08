// hooks/useFetchData.ts
import { useLazyMainSectionFetchQuery } from "../redux/api/mainApiSlice";
import { useEffect } from "react";
import useFetchOnView from "./useFetchOnView";
import { useAppDispatch } from "../redux/hook";
import {
  setAddidasItems,
  setBalenciagaItems,
  setNikeItems,
} from "../redux/slices/homeItemsSlice";

export const useFetchHomePage = (section: string) => {
  const [fetchData, { data, isLoading }] = useLazyMainSectionFetchQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("SECTIONNAME", section, "DATA", data);
    if (data) {
      if (data.title === "Addidas Sneakers") {
        dispatch(setAddidasItems(data));
      }
      if (data.title === "Nike Sneakers") {
        dispatch(setNikeItems(data));
      }
      if (data.title === "Balenciaga Accessories") {
        dispatch(setBalenciagaItems(data));
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
