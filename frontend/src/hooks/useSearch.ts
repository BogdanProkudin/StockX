import debounce from "lodash.debounce";
import React from "react";
import { useLazySearchItemsQuery } from "../redux/api/mainApiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  setIsLoading,
  setSelectedSubCategory,
  setSuggestionCountsArr,
} from "../redux/slices/searchSlice";

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.searchSlice.searchValue);
  const [fetchItems, { data, isLoading, isError, isSuccess }] =
    useLazySearchItemsQuery();

  const handleSearch = React.useCallback(
    debounce(async ({ query, isSearching }) => {
      console.log("z", isSearching, query);

      if (query.length > 0 && isSearching) {
        const result = await fetchItems({
          searchingValue: query,
          categoryQuery: undefined,
          brandQuery: undefined,
        });

        if (result.isSuccess) {
          dispatch(setIsLoading(false));
          dispatch(setSelectedSubCategory(""));
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
    isSuccess,
  };
};
