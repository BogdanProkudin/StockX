// utils/updateCategories.ts
import { Dispatch } from "redux";
import {
  setCategoryNames,
  setSelectedSubCategory,
} from "../redux/slices/searchSlice"; // Adjust the import path as needed

export const updateCategories = (
  updatedCategories: string[],
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void,
  dispatch: Dispatch,
  fetchData: ({
    searchingValue,
    isCategorySearch,
  }: {
    searchingValue: string;
    isCategorySearch: boolean;
  }) => void | undefined,
) => {
  const newSearchParams = new URLSearchParams(searchParams);
  if (updatedCategories.length === 0) {
    dispatch(setSelectedSubCategory(""));
    newSearchParams.delete("s");
    newSearchParams.delete("category");
    setSearchParams(newSearchParams);
  }
  if (
    newSearchParams.has("s") &&
    !updatedCategories.includes(`Search: "${newSearchParams.get("s")}"`)
  ) {
    newSearchParams.delete("s");
    setSearchParams(newSearchParams);
  } else if (newSearchParams.has("category")) {
    newSearchParams.delete("category");
    setSearchParams(newSearchParams);
    dispatch(setSelectedSubCategory(""));

    fetchData({
      isCategorySearch: false,
      searchingValue: newSearchParams.get("s") ?? "",
    });
  }

  if (updatedCategories.length === 1) {
    return dispatch(setCategoryNames([]));
  }
};
