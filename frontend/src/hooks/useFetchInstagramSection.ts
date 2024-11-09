// hooks/useFetchData.ts

import { useEffect } from "react";
import useFetchOnView from "./useFetchOnView";
import { useAppDispatch } from "../redux/hook";
import { setInstagramItems } from "../redux/slices/homeItemsSlice";
import { useLazyInstagramSectionFetchQuery } from "../redux/api/mainApiSlice";

export const useFetchInstagramSection = (section: string) => {
  const [fetchData, { data, isLoading }] = useLazyInstagramSectionFetchQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("SECTIONNAME", section, "DATA", data);
    if (data) {
      dispatch(setInstagramItems(data));
    }
  }, [data]);

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
