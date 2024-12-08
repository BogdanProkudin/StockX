import React, { useCallback } from "react";
import { useAppSelector } from "../../../../redux/hook";

interface BrandItemProps {
  brandName: string;
  subBrandNames: string[];
  isShowDropDown: boolean;
  setIsShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectBrand: (selectedBrand: string) => void;
}

const BrandItem: React.FC<BrandItemProps> = React.memo(
  ({
    brandName,
    setIsShowDropDown,
    isShowDropDown,
    subBrandNames,
    handleSelectBrand,
  }) => {
    const selectedSubBrand = useAppSelector(
      (state) => state.searchSlice.selectedBrand,
    );

    const toggleDropdown = useCallback(() => {
      setIsShowDropDown(!isShowDropDown);
    }, [isShowDropDown, setIsShowDropDown]);

    return (
      <div className="flex h-full w-full flex-col border-b-2 border-t-2 border-E2E8F0 pb-1 pt-1">
        <button
          onClick={toggleDropdown}
          className="flex cursor-pointer items-center justify-between p-4"
          aria-expanded={isShowDropDown}
          aria-controls="subcategory-list"
        >
          <p className="select-none pb-0 text-base font-semibold text-blackTextColor">
            {brandName}
          </p>
          {selectedSubBrand.length > 1 && <span>{selectedSubBrand}</span>}
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
          className={`flex flex-col gap-3 overflow-y-auto pl-4 transition-all duration-300 ease-in-out ${
            isShowDropDown ? "max-h-64 pb-3" : "max-h-0"
          }`}
          role="list"
        >
          {subBrandNames.map((subName) => (
            <div key={subName} className="group flex items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id={`checkbox-${subName}`}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white transition-colors checked:border-black checked:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  checked={selectedSubBrand.includes(subName)}
                  onChange={() => handleSelectBrand(subName)}
                />
                <svg
                  className="pointer-events-none absolute left-0 h-5 w-5 text-white opacity-0 peer-checked:opacity-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <label
                htmlFor={`checkbox-${subName}`}
                className="cursor-pointer pl-2 text-[16px] font-[500] group-hover:text-gray-700"
              >
                {subName}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

BrandItem.displayName = "BrandItem";

export default BrandItem;
