import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { setCategoryNames } from "../../../redux/slices/searchSlice";
import { useSearchParams } from "react-router-dom";
import ChosenCategoryItem from "./ChosenCaregoryItem";
import clsx from "clsx";
import ChosenCategorySkeleton from "./ChosenCategoryItemSkeleton";

const ChosenCategoryList: React.FC<{ isLoading: boolean }> = React.memo(
  ({ isLoading }) => {
    const categoryNames = useAppSelector(
      (state) => state.searchSlice.categoryNames,
    );

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
      const searchTerm = searchParams.get("s");
      const defaultCategories = searchTerm
        ? ["Clear All", `Search: "${searchTerm}"`, "BOSS", "Q"]
        : [];
      dispatch(setCategoryNames(defaultCategories));
    }, [dispatch]);

    return (
      <div
        className={clsx("", {
          "flex h-10 w-full items-center gap-1": categoryNames.length > 0,
        })}
      >
        {isLoading
          ? ["Clear All", ""].map((category, index) => (
              <ChosenCategorySkeleton key={index} categoryName={category} />
            ))
          : categoryNames.map((category) => (
              <ChosenCategoryItem key={category} categoryName={category} />
            ))}
      </div>
    );
  },
);

export default ChosenCategoryList;
