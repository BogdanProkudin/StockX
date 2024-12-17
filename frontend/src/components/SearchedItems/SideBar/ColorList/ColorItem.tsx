import { useCallback } from "react";
import { useAppSelector } from "../../../../redux/hook";

interface ColorItemProps {
  handleSelectSubColor: (selectedColor: string) => void;
  setIsShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  isShowDropDown: boolean;
  subColors: string[];
}
const ColorItem: React.FC<ColorItemProps> = ({
  subColors,
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
        {selectedColor.length > 1 && (
          <div className="flex items-center gap-2">
            <span>{selectedColor}</span>
            <div
              style={{ backgroundColor: selectedColor }}
              className="h-5 w-5 rounded-full border-2"
            ></div>
          </div>
        )}
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
        className={`flex flex-col gap-3 overflow-hidden overflow-y-auto pl-4 transition-all duration-300 ease-in-out ${
          isShowDropDown ? "max-h-64 pb-3" : "max-h-0"
        }`}
        role="list"
      >
        <div className="grid grid-cols-4 gap-3 overflow-hidden">
          {subColors.map((color) => (
            <div className="flex cursor-pointer flex-col items-center gap-2 overflow-hidden">
              <div
                style={{ backgroundColor: color }}
                className="h-10 w-10 rounded-full border-2"
                onClick={() => handleSelectSubColor(color)}
              ></div>
              <span>{color}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ColorItem;
