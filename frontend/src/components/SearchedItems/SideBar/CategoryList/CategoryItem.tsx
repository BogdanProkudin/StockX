import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useAppSelector } from "../../../../redux/hook";

interface CategoryItemProps {
  categoryName: string;
  subcategoryNames: string[];
  setIsShowDropDown: Dispatch<SetStateAction<boolean>>;
  handleSelectSubCategory: (selectedSubCategory: string) => void;
  isShowDropDown: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = React.memo(
  ({
    isShowDropDown,
    setIsShowDropDown,
    subcategoryNames,
    handleSelectSubCategory,
    categoryName,
  }) => {
    const selectedSubCategory = useAppSelector(
      (state) => state.searchSlice.selectedSubCategory,
    );

    const toggleDropdown = useCallback(() => {
      setIsShowDropDown(!isShowDropDown);
    }, [isShowDropDown, setIsShowDropDown]);

    const handleSubCategoryClick = useCallback(
      (subName: string) => {
        handleSelectSubCategory(subName);
      },
      [handleSelectSubCategory],
    );

    return (
      <div className="flex h-full w-full flex-col border-b-2 border-t-2 border-E2E8F0 pb-1 pt-1">
        <button
          onClick={toggleDropdown}
          className="flex cursor-pointer items-center justify-between p-4"
          aria-expanded={isShowDropDown}
          aria-controls="subcategory-list"
        >
          <p className="select-none pb-0 text-base font-semibold text-blackTextColor">
            {categoryName}
          </p>
          {selectedSubCategory.length > 1 && <span>{selectedSubCategory}</span>}
          <svg
            viewBox="0 0 50 50"
            focusable="false"
            aria-hidden="true"
            className={`h-[1rem] w-[1rem] transform pb-0 transition-transform duration-300 ${
              isShowDropDown ? "rotate-0" : "rotate-180"
            }`}
          >
            <path
              fill="currentColor"
              d="M40.2 35.7999L25 19.6L9.79999 35.7999L7.09999 33.2999L25 14.2L42.9 33.2999L40.2 35.7999Z"
            />
          </svg>
        </button>

        <div
          id="subcategory-list"
          className={`flex flex-col gap-3 overflow-hidden pl-4 transition-all duration-300 ease-in-out ${
            isShowDropDown ? "max-h-80 pb-3" : "max-h-0"
          }`}
          role="list"
        >
          {subcategoryNames.map((subName) => (
            <button
              key={subName}
              onClick={() => handleSubCategoryClick(subName)}
              className={`w-fit cursor-pointer text-[16px] font-[500] ${
                selectedSubCategory === subName ? "border-b-2 border-black" : ""
              } hover:${
                selectedSubCategory === subName ? "no-underline" : "underline"
              }`}
              role="listitem"
              aria-selected={selectedSubCategory === subName}
            >
              {subName}
            </button>
          ))}
        </div>
      </div>
    );
  },
);

CategoryItem.displayName = "CategoryItem";

export default CategoryItem;
