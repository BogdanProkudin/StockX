import debounce from "lodash.debounce";
import React from "react";
import { useLazySearchItemsQuery } from "../redux/api/mainApiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  setIsLoading,
  setSuggestionCountsArr,
} from "../redux/slices/searchSlice";

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.searchSlice.searchValue);
  const [fetchItems, { data, isLoading, isError }] = useLazySearchItemsQuery();

  const handleSearch = React.useCallback(
    debounce(async (query) => {
      if (query.length > 0) {
        const result = await fetchItems(query);

        if (result.isSuccess) {
          dispatch(setIsLoading(false));

          dispatch(setSuggestionCountsArr(result.data));
        }
      }
    }, 700),
    [dispatch, fetchItems],
  );
  return {
    searchValue,
    handleSearch,
    data,
    isLoading,
    isError,
  };
};
