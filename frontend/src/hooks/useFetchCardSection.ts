// hooks/useFetchData.ts
import { useLazyCardSectionFetchQuery } from "../redux/api/mainApiSlice";
import { useEffect } from "react";
import useFetchOnView from "./useFetchOnView";
import { useAppDispatch } from "../redux/hook";
import { setBottCard, setTopCard } from "../redux/slices/homeItemsSlice";

export const useFetchCardSection = (section: string) => {
  const [fetchData, { data, isLoading }] = useLazyCardSectionFetchQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      if (data.sectionName === "top") {
        dispatch(setTopCard(data));
      }
      if (data.sectionName === "bott") {
        dispatch(setBottCard(data));
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
