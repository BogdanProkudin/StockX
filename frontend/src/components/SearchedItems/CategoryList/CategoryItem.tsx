import { Dispatch, SetStateAction, useEffect } from "react";

import { useAppSelector } from "../../../redux/hook";
type CategoryItemProps = {
  categoryName: string;
  subcategoryNames: string[];
  setIsShowDropDown: Dispatch<SetStateAction<boolean>>;
  handleSelectSubCategory: (selectedSubCategory: string) => void;
  isShowDropDown: boolean;
};
const CategoryItem: React.FC<CategoryItemProps> = ({
  isShowDropDown,
  setIsShowDropDown,
  subcategoryNames,
  handleSelectSubCategory,
  categoryName,
}) => {
  const selectedSubCategory = useAppSelector(
    (state) => state.searchSlice.selectedSubCategory,
  );

  return (
    <div className="border- border-E2E8F0 flex h-full w-full flex-col border-b-2 border-t-2">
      <div
        onClick={() => setIsShowDropDown(!isShowDropDown)}
        className="flex cursor-pointer items-center justify-between p-4"
      >
        <p className="select-none pb-0 text-base font-semibold text-blackTextColor">
          {categoryName}
        </p>
        {selectedSubCategory.length > 1 && <span>{selectedSubCategory}</span>}
        <svg
          viewBox="0 0 50 50"
          focusable="false"
          className={`h-[1rem] w-[1rem] transform pb-0 transition-transform duration-300 ${isShowDropDown ? "rotate-0" : "rotate-180"}`}
        >
          <path
            fill="currentColor"
            d="M40.2 35.7999L25 19.6L9.79999 35.7999L7.09999 33.2999L25 14.2L42.9 33.2999L40.2 35.7999Z"
          ></path>
        </svg>
      </div>
      <div
        className={`flex flex-col gap-3 overflow-hidden pl-4 transition-all duration-300 ease-in-out ${
          isShowDropDown ? "max-h-64" : "max-h-0"
        }`}
      >
        {subcategoryNames.map((subName) => {
          return (
            <a
              onClick={() => handleSelectSubCategory(subName)}
              key={subName}
              className={`w-fit cursor-pointer text-[16px] font-[500] ${selectedSubCategory === subName ? "border-b-2 border-black" : ""} hover:${selectedSubCategory === subName ? "no-underline" : "underline"}`}
            >
              {subName}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryItem;
