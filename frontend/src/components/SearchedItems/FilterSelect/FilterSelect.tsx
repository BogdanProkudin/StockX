import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { setSelectedFilter } from "../../../redux/slices/searchSlice";
import Select, { GroupBase, StylesConfig } from "react-select";
import { useMediaQuery } from "@mui/material";
import TrendingButton from "../SideBar/Trending/TrendingButton";
import CategoryList from "../SideBar/CategoryList/CategoryList";
import BrandsList from "../SideBar/BrandsList/BrandsList";
import GenderList from "../SideBar/GenderList/GenderList";
import ColorList from "../SideBar/ColorList/ColorList";
import Control from "./FilterControl";
import Option from "./FilterOptions";
import FilterSkeleton from "./FilterSkeleton";
import { useSearchParams } from "react-router-dom";
import ChosenCategoryList from "../ChosenCategory/ChosenCategoryList";

interface FilterSelectProps {
  isLoading: boolean;
}
export interface FilterOption {
  label: string;
  value: string;
}
const customStyles: StylesConfig<
  FilterOption,
  false,
  GroupBase<FilterOption>
> = {
  container: (base) => ({
    ...base,
    maxWidth: "250px",
    marginBottom: "1rem",
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: "#EDEDED",
    borderRadius: "1rem",
    borderColor: state.isFocused ? "#007bff" : "#ccc",
    paddingLeft: "12px",
    cursor: "pointer",
    boxShadow: state.isFocused ? "0 0 0 1px #007bff" : undefined,
    "&:hover": { borderColor: "#007bff" },
  }),
  singleValue: (base) => ({
    ...base,
    color: "black",
    fontSize: "14px",
    paddingRight: "5px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "black",
    fontSize: "14px",
    paddingRight: "5px",
  }),
  option: (base) => ({
    ...base,
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    fontSize: "15px",
    color: "black",
    cursor: "pointer",
    "&:hover": { backgroundColor: "#CFCFCF" },
  }),
};
const FilterSelect: React.FC<FilterSelectProps> = ({ isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilter = useAppSelector(
    (state) => state.searchSlice.selectedFilter,
  );
  const categoryNames = useAppSelector(
    (state) => state.searchSlice.categoryNames,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");
  const dispatch = useAppDispatch();
  const isLargeScreen = useMediaQuery("(min-width: 770px)");

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };
  useEffect(() => {
    if (!isLoading) {
      const sortQuery = searchParams.get("sort");
      dispatch(
        setSelectedFilter({
          label: sortQuery ? sortQuery : "Featured",
          value: "1",
        }),
      );
    }
  }, [isLoading]);

  const handleSelectFilter = (newValue: FilterOption | null) => {
    if (newValue) {
      searchParams.set("sort", newValue.value);
      setSearchParams(searchParams);

      dispatch(setSelectedFilter(newValue));
    }
  };

  if (isLargeScreen) {
    const sortOptions = [
      { value: "featured", label: "Featured" },
      { value: "priceAsc", label: "Price: Low to High" },
      { value: "priceDesc", label: "Price: High to Low" },
      { value: "releaseDate", label: "Release Date" },
      { value: "availability", label: "Availability" },
      { value: "alphabetical", label: "Alphabetical" },
    ];
    console.log(categoryNames);

    return (
      <Select<FilterOption, false>
        onChange={handleSelectFilter}
        value={selectedFilter}
        components={{ Control: isLoading ? FilterSkeleton : Control, Option }}
        options={sortOptions}
        isSearchable={false}
        styles={customStyles}
        placeholder="Featured"
      />
    );
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex h-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-4 py-2"
      >
        <span>Filter & Sort</span>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 7H21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M6 12H18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M10 17H14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        className={`${styles.overlay} ${isOpen ? styles.active : ""}`}
        onClick={handleClose}
      />

      <div className={`${styles.bottomSheet} ${isOpen ? styles.active : ""}`}>
        <div className={styles.sheetHeader}>
          <h2 className="text-lg font-semibold">Filter & Sort</h2>
          <button onClick={handleClose} className={styles.closeButton}>
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
              />
            </svg>
          </button>
        </div>

        <div
          style={{
            display:
              categoryNames.length > 0 && !isLargeScreen ? "flex" : "none",
          }}
          className={styles.sheetChosenCategories}
        >
          <ChosenCategoryList isLoading={false} />
        </div>

        <div className={styles.sheetContent}>
          <div className={styles.filterSection}>
            <TrendingButton />
            <CategoryList
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
            <BrandsList
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
            <GenderList
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
            <ColorList
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </div>
          <button className={styles.applyButton} onClick={handleClose}>
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSelect;
