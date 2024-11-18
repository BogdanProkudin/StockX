// utils/updateCategories.ts
import { Dispatch } from "redux";
import { setCategoryNames } from "../redux/slices/searchSlice"; // Adjust the import path as needed

export const updateCategories = (
  updatedCategories: string[],
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void,
  dispatch: Dispatch,
) => {
  const newSearchParams = new URLSearchParams(searchParams);

  if (newSearchParams.has("s")) {
    newSearchParams.delete("s");
    setSearchParams(newSearchParams);
  }
  if (updatedCategories.length === 1) {
    return dispatch(setCategoryNames([]));
  }

  dispatch(setCategoryNames(updatedCategories));
};
