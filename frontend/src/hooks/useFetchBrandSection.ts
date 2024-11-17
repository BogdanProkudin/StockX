// hooks/useFetchData.ts
import { useLazyMainSectionFetchQuery } from "../redux/api/mainApiSlice";
import { useEffect } from "react";
import useFetchOnView from "./useFetchOnView";
import { useAppDispatch } from "../redux/hook";
import {
  setAccessories,
  setAddidasItems,
  setBalenciagaItems,
  setNikeItems,
  setSupremeItems,
  setTimberlandItems,
  setRickOwensItems,
} from "../redux/slices/homeItemsSlice";

export const useFetchBrandSection = (section: string) => {
  const [fetchData, { data, isLoading }] = useLazyMainSectionFetchQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("SECTIONNAME", section, "DATA", data);
    if (data) {
      if (data.title === "Addidas Collection") {
        dispatch(setAddidasItems(data));
      }
      if (data.title === "Nike Collection") {
        dispatch(setNikeItems(data));
      }
      if (data.title === "Balenciaga Collection") {
        dispatch(setBalenciagaItems(data));
      }
      if (data.title === "Featured Accessories") {
        dispatch(setAccessories(data));
      }
      if (data.title === "Supreme Collection") {
        dispatch(setSupremeItems(data));
      }
      if (data.title === "Timberland Collection") {
        dispatch(setTimberlandItems(data));
      }
      if (data.title === "Rick Owens Collection") {
        dispatch(setRickOwensItems(data));
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
