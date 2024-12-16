import { useCallback } from "react";
import { useAppSelector } from "../../../../redux/hook";
import { stat } from "fs";

interface ColorItemProps {
  color: string;
  handleSelectSubColor: (selectedColor: string) => void;
  setIsShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  isShowDropDown: boolean;
}
const ColorItem: React.FC<ColorItemProps> = ({
  color,
  handleSelectSubColor,
  setIsShowDropDown,
  isShowDropDown,
}) => {
  const selectedColor = useAppSelector(
    (state) => state.searchSlice.selectedColor,
  );
  const toggleDropdown = useCallback(() => {
    setIsShowDropDown(!isShowDropDown);
  }, [isShowDropDown, setIsShowDropDown]);

  return (
    <div className="flex h-full w-full flex-col border-b-2 border-t-2 border-E2E8F0 pb-1 pt-1">
      <button
        onClick={toggleDropdown}
        className="flex w-72 cursor-pointer items-center justify-between p-4"
        aria-expanded={isShowDropDown}
        aria-controls="subcategory-list"
      >
        <p className="select-none pb-0 text-base font-semibold text-blackTextColor">
          {"COLOR"}
        </p>
        {selectedColor.length > 1 && <span>{selectedColor}</span>}
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
      ></div>
    </div>
  );
};
export default ColorItem;
