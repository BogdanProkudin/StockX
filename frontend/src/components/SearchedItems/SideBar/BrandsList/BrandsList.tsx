import React, { useCallback, useMemo, useState } from "react";
import BrandItem from "./BrandItem";
import { motion, AnimatePresence } from "framer-motion";
import {
  setSelectedBrand,
  setSelectedSubCategory,
} from "../../../../redux/slices/searchSlice";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/hook";

interface IBrandItem {
  brandName: string;
  subBrandNames: string[];
}
const BrandsListItems: IBrandItem[] = [
  {
    brandName: "BRANDS",
    subBrandNames: [
      "Nike",
      "adidas",
      "Puma",
      "Converse",
      "Yeezy",
      "Jordan",
      "Supreme",
      "Travis Scott",
      "Converse",
      "NBA",
      "Reebok",
    ],
  },
];
const BrandsList = React.memo(() => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSelectBrand = useCallback(
    (selectedBrandName: string) => {
      dispatch(setSelectedBrand(selectedBrandName));
      setIsShowDropDown(false);

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("brand", selectedBrandName);
      setSearchParams(newSearchParams);
    },
    [dispatch, searchParams, setSearchParams],
  );
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  return (
    <div>
      {BrandsListItems.map((category) => (
        <BrandItem
          brandName={category.brandName}
          key={category.brandName}
          subBrandNames={category.subBrandNames}
          isShowDropDown={isShowDropDown}
          setIsShowDropDown={setIsShowDropDown}
          handleSelectBrand={handleSelectBrand}
        />
      ))}
    </div>
  );
});

BrandsList.displayName = "BrandsList";

export default BrandsList;
