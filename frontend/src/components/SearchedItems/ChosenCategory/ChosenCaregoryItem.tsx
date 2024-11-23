import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { setCategoryNames } from "../../../redux/slices/searchSlice";
import { useSearchParams } from "react-router-dom";
import { updateCategories } from "../../../utils/updateCategories";
import ChosenCategorySkeleton from "./ChosenCategoryItemSkeleton";

type ChosenCategoryItemProps = {
  categoryName: string;
  isLoading: boolean;
};

const ChosenCategoryItem: React.FC<ChosenCategoryItemProps> = React.memo(
  ({ categoryName, isLoading }) => {
    const categoryNames = useAppSelector(
      (state) => state.searchSlice.categoryNames,
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const handleDeleteCategoryItem = () => {
      const updatedCategoryNames = categoryNames.filter((el) => {
        return el !== categoryName;
      });

      updateCategories(
        updatedCategoryNames,
        searchParams,
        setSearchParams,
        dispatch,
      );
    };

    const handleDeleteAllItems = () => {
      updateCategories([], searchParams, setSearchParams, dispatch);
    };
    const handleCategoryItemClick = () => {
      if (categoryName === "Clear All") {
        handleDeleteAllItems();
      }
    };

    return (
      <button className="text-text-primary mb-1 mr-1 mt-1 inline-flex h-[30px] min-h-[22px] min-w-[20px] max-w-full cursor-pointer items-center justify-center rounded-2xl bg-categoryButtonColor px-2 py-2 pl-3 pr-3 align-top font-sans text-sm text-xs font-normal leading-tight shadow outline-2 outline-offset-2">
        {isLoading && categoryName !== "Clear All" ? (
          <ChosenCategorySkeleton />
        ) : (
          <span
            onClick={handleCategoryItemClick}
            className="text-center text-sm text-blackTextColor"
          >
            {categoryName}
          </span>
        )}
        {!isLoading && categoryName !== "Clear All" && (
          <>
            <hr className="ml-1 mr-[6px] mt-[0.2rem] h-3 border-0 border-l border-solid border-textDisabled opacity-60" />
            <CloseIcon
              onClick={handleDeleteCategoryItem}
              style={{ fontSize: "16px", marginTop: "1.6px" }}
            />
          </>
        )}
      </button>
    );
  },
);

export default ChosenCategoryItem;
