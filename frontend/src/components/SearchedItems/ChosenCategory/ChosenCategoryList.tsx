import { useEffect, useState } from "react";
import ChosenCategoryItem from "./ChosenCaregoryItem";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  setCategoryNames,
  setSearchValue,
} from "../../../redux/slices/searchSlice";
import React from "react";

const ChosenCategoryList = () => {
  const categoryName = useAppSelector(
    (state) => state.searchSlice.categoryNames,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get("s");
    dispatch(setCategoryNames(["Clear All", `Search:"${searchTerm}"`]));
  }, []);

  return (
    <div className="flex h-10 w-full items-center gap-1">
      {categoryName.map((category) => {
        return <ChosenCategoryItem categoryName={category} />;
      })}
    </div>
  );
};

export default React.memo(ChosenCategoryList);
