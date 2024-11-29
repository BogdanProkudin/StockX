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

const ChosenCategoryList: React.FC<{ isLoading: boolean; fetchData: any }> =
  React.memo(({ isLoading, fetchData }) => {
    const categoryNames = useAppSelector(
      (state) => state.searchSlice.categoryNames,
    );

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
      const searchTerm = searchParams.get("s");
      const categoryTerm = searchParams.get("category");
      const defaultCategories = searchTerm
        ? ["Clear All"]
        : categoryTerm
          ? ["Clear All"]
          : [];
      if (searchTerm) {
        defaultCategories.push(`Search: "${searchTerm}"`);
      }
      if (categoryTerm) {
        dispatch(setSelectedSubCategory(categoryTerm));
        defaultCategories.push(categoryTerm);
      }

      dispatch(setCategoryNames(defaultCategories));
    }, [dispatch, searchParams]);

    const skeletonCategories = ["Clear All", ""];

    return (
      <div
        className={clsx("", {
          "flex h-10 w-full items-center gap-1": categoryNames.length > 0,
        })}
      >
        {isLoading
          ? skeletonCategories.map((category, index) => (
              <ChosenCategorySkeleton key={index} categoryName={category} />
            ))
          : categoryNames.map((category) => (
              <ChosenCategoryItem
                fetchData={fetchData}
                key={category}
                categoryName={category}
              />
            ))}
      </div>
    );
  });

export default ChosenCategoryList;
