import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/hook";
import { setSelectedSubCategory } from "../../../../redux/slices/searchSlice";
import CategoryItem from "./CategoryItem";
interface CategoryListProps {
  activeFilter: string;
  setActiveFilter: Dispatch<SetStateAction<string>>;
}
interface Category {
  categoryName: string;
  subcategoryNames: string[];
}

const categoryListItems: Category[] = [
  {
    categoryName: "CATEGORY",
    subcategoryNames: [
      "Apparel",
      "Sneakers",
      "Collectibles",
      "Basketball",
      "Handbags",
      "Soccer",
      "Watches",
    ],
  },
];

const CategoryList: React.FC<CategoryListProps> = ({
  activeFilter,
  setActiveFilter,
}) => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectSubCategory = useCallback(
    (selectedSubCategoryName: string) => {
      dispatch(setSelectedSubCategory(selectedSubCategoryName));
      setActiveFilter("");
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("category", selectedSubCategoryName);
      setSearchParams(newSearchParams);
    },
    [dispatch, searchParams, setSearchParams],
  );

  return (
    <div>
      {categoryListItems.map((category) => (
        <CategoryItem
          key={category.categoryName}
          handleSelectSubCategory={handleSelectSubCategory}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          categoryName={category.categoryName}
          subcategoryNames={category.subcategoryNames}
        />
      ))}
    </div>
  );
};

export default React.memo(CategoryList);
