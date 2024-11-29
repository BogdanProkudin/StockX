import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import { setSelectedSubCategory } from "../../../redux/slices/searchSlice";
import CategoryItem from "./CategoryItem";
import { useEffect, useState } from "react";

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSelectSubCategory = (selectedSubCategoryName: string) => {
    dispatch(setSelectedSubCategory(selectedSubCategoryName));

    setIsShowDropDown(false);

    searchParams.set("category", selectedSubCategoryName);
    setSearchParams(searchParams);
  };

  const categoryListItems = [
    {
      categoryName: "CATEGORY",
      subcategoryNames: ["Jackets", "BackPacks", "Shoes", "Hat", "Trousers"],
    },
  ];
  return (
    <div>
      {categoryListItems.map((categoryName) => {
        return (
          <CategoryItem
            handleSelectSubCategory={handleSelectSubCategory}
            isShowDropDown={isShowDropDown}
            setIsShowDropDown={setIsShowDropDown}
            categoryName={categoryName.categoryName}
            subcategoryNames={categoryName.subcategoryNames}
          />
        );
      })}
    </div>
  );
};

export default CategoryList;
