import React, { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import { setSelectedSubCategory } from "../../../redux/slices/searchSlice";
import CategoryItem from "./CategoryItem";

interface Category {
  categoryName: string;
  subcategoryNames: string[];
}

const categoryListItems: Category[] = [
  {
    categoryName: "CATEGORY",
    subcategoryNames: [
      "Jacket",
      "Sneakers",
      "Backpack",
      "Shoes",
      "Hat",
      "Trousers",
      "T-shirt",
      "Tech Fleece",
      "Sportswear",
      "Hoodie",
    ],
  },
];

const CategoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectSubCategory = useCallback(
    (selectedSubCategoryName: string) => {
      dispatch(setSelectedSubCategory(selectedSubCategoryName));
      setIsShowDropDown(false);

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
          isShowDropDown={isShowDropDown}
          setIsShowDropDown={setIsShowDropDown}
          categoryName={category.categoryName}
          subcategoryNames={category.subcategoryNames}
        />
      ))}
    </div>
  );
};

export default React.memo(CategoryList);
