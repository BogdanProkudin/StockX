import debounce from "lodash.debounce";
import React from "react";
import {
  useLazyGetSuggestionCountQuery,
  useLazySearchItemsQuery,
} from "../redux/api/mainApiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  setIsLoading,
  setSuggestionCountsArr,
} from "../redux/slices/searchSlice";

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.searchSlice.searchValue);
  const [fetchItems, { data, isLoading, isError }] = useLazySearchItemsQuery();
  const [getSuggestionCount] = useLazyGetSuggestionCountQuery();
  const handleSearch = React.useCallback(
    debounce(async (query) => {
      if (query.length > 0) {
        const result = await fetchItems(query);
        const resultSuggestionCount = await getSuggestionCount(query);
        if (result.isSuccess && resultSuggestionCount.isSuccess) {
          dispatch(setIsLoading(false));
          dispatch(setSuggestionCountsArr(resultSuggestionCount));
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
