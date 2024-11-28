import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import { setSelectedSubCategory } from "../../../redux/slices/searchSlice";
import CategoryItem from "./CategoryItem";
import { useState } from "react";

const CategoryList = ({
  fetchData,
  searchQuery,
}: {
  fetchData: (searchQuery: string) => void;
  searchQuery: string;
}) => {
  const dispatch = useAppDispatch();
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSelectSubCategory = (selectedSubCategoryName: string) => {
    dispatch(setSelectedSubCategory(selectedSubCategoryName));
    fetchData(`${searchQuery} ${selectedSubCategoryName}`);
    setIsShowDropDown(false);

    searchParams.set("category", selectedSubCategoryName);
    setSearchParams(searchParams);
  };
  const categoryListItems = [
    {
      categoryName: "CATEGORY",
      subcategoryNames: [
        "Snikers",
        "Apparel",
        "Shoes",
        "Accessories",
        "Collectibles",
      ],
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
