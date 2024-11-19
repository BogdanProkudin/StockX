// hooks/useFetchData.ts
import { useLazySliderFetchQuery } from "../redux/api/mainApiSlice";
import { useEffect } from "react";
import useFetchOnView from "./useFetchOnView";
import { useAppDispatch } from "../redux/hook";
import { setBottSlider, setTopSlider } from "../redux/slices/homeItemsSlice";

export const useFetchSliderSection = (section: string) => {
  const [fetchData, { data, isLoading }] = useLazySliderFetchQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      if (data.sectionName === "top") {
        dispatch(setTopSlider(data));
      }
      if (data.sectionName === "bott") {
        dispatch(setBottSlider(data));
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
