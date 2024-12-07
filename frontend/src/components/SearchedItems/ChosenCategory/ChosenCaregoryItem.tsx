import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useSearchParams } from "react-router-dom";
import { updateCategories } from "../../../utils/updateCategories";
import CloseIcon from "@mui/icons-material/Close";
interface ChosenCategoryItemProps {
  categoryName: string;
  isClearAll?: boolean;
}

const ChosenCategoryItem: React.FC<ChosenCategoryItemProps> = React.memo(
  ({ categoryName, isClearAll }) => {
    const categoryNames = useAppSelector(
      (state) => state.searchSlice.categoryNames,
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const handleClick = useCallback(() => {
      updateCategories(
        categoryName,
        categoryNames,
        dispatch,
        searchParams,
        setSearchParams,
      );
    }, [categoryName, categoryNames, dispatch, searchParams, setSearchParams]);

    return (
      <button
        className="text-text-primary mb-1 mr-1 mt-1 inline-flex h-[30px] min-h-[22px] min-w-[20px] max-w-full cursor-pointer items-center justify-center rounded-2xl bg-categoryButtonColor px-3 py-2 font-sans text-sm font-normal leading-tight shadow outline-2 outline-offset-2 transition-colors duration-200 hover:bg-gray-200"
        onClick={handleClick}
        aria-label={
          isClearAll ? "Clear all filters" : `Remove ${categoryName} filter`
        }
      >
        <span className="text-center text-sm text-blackTextColor">
          {categoryName}
        </span>

        {!isClearAll && (
          <>
            <hr className="ml-1 mr-[6px] mt-[0.2rem] h-3 border-0 border-l border-solid border-textDisabled opacity-60" />
            <CloseIcon
              onClick={handleClick}
              className="text-gray-600 transition-colors duration-200 hover:text-gray-800"
              style={{ fontSize: "16px", marginTop: "1.6px" }}
            />
          </>
        )}
      </button>
    );
  },
);

ChosenCategoryItem.displayName = "ChosenCategoryItem";

export default ChosenCategoryItem;
