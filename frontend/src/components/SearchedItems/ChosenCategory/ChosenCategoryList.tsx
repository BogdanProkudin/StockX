import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { setCategoryNames } from "../../../redux/slices/searchSlice";
import { useSearchParams } from "react-router-dom";
import ChosenCategoryItem from "./ChosenCaregoryItem";

const ChosenCategoryList: React.FC = React.memo(() => {
  const categoryNames = useAppSelector(
    (state) => state.searchSlice.categoryNames,
  );
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchTerm = searchParams.get("s");
    const defaultCategories = searchTerm
      ? ["Clear All", `Search: "${searchTerm}"`]
      : [];
    dispatch(setCategoryNames(defaultCategories));
  }, [searchParams, dispatch]);

  return (
    <div className="flex h-10 w-full items-center gap-1">
      {categoryNames.map((category) => (
        <ChosenCategoryItem key={category} categoryName={category} />
      ))}
    </div>
  );
});

export default ChosenCategoryList;
