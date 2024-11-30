import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  setCategoryNames,
  setSelectedSubCategory,
} from "../../../redux/slices/searchSlice";
import { useSearchParams } from "react-router-dom";
import ChosenCategoryItem from "./ChosenCaregoryItem";
import clsx from "clsx";
import ChosenCategorySkeleton from "./ChosenCategoryItemSkeleton";

interface ChosenCategoryListProps {
  isLoading: boolean;
  fetchData: (params: { searchingValue: string }) => void;
}

const ChosenCategoryList: React.FC<ChosenCategoryListProps> = React.memo(
  ({ isLoading, fetchData }) => {
    const categoryNames = useAppSelector(
      (state) => state.searchSlice.categoryNames,
    );
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
      const searchTerm = searchParams.get("s");
      const categoryTerm = searchParams.get("category");

      const defaultCategories = [];

      if (searchTerm || categoryTerm) {
        defaultCategories.push("Clear All");
      }

      if (searchTerm) {
        defaultCategories.push(`Search: "${searchTerm}"`);
      }

      if (categoryTerm) {
        dispatch(setSelectedSubCategory(categoryTerm));
        defaultCategories.push(categoryTerm);
      }

      dispatch(setCategoryNames(defaultCategories));
    }, [dispatch, searchParams]);

    if (!isLoading && categoryNames.length === 0) {
      return null;
    }

    return (
      <div
        className={clsx("transition-all duration-200", {
          "flex h-10 w-full flex-wrap items-center gap-1": true,
        })}
      >
        {isLoading
          ? Array(2)
              .fill(null)
              .map((_, index) => (
                <ChosenCategorySkeleton
                  key={`skeleton-${index}`}
                  categoryName={index === 0 ? "Clear All" : ""}
                />
              ))
          : categoryNames.map((category) => (
              <ChosenCategoryItem
                key={`category-${category}`}
                categoryName={category}
              />
            ))}
      </div>
    );
  },
);

ChosenCategoryList.displayName = "ChosenCategoryList";

export default ChosenCategoryList;
