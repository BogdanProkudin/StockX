import React, { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { setSelectedGender } from "../../../../redux/slices/searchSlice";
import GenderItem from "./GenderItem";
import { useAppDispatch } from "../../../../redux/hook";

interface Gender {
  genderName: string;
  subGenderNames: string[];
}

const genderListItems: Gender[] = [
  {
    genderName: "GENDER",
    subGenderNames: ["Male", "Female", "Unisex", "Child"],
  },
];

const GenderList = React.memo(
  ({
    activeFilter,
    setActiveFilter,
  }: {
    activeFilter: string;
    setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSelectSubGender = useCallback(
      (selectedGender: string) => {
        dispatch(setSelectedGender(selectedGender));
        setActiveFilter("");
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("gender", selectedGender);
        setSearchParams(newSearchParams);
      },
      [dispatch, searchParams, navigate],
    );

    return (
      <>
        {genderListItems.map(({ genderName, subGenderNames }) => (
          <GenderItem
            key={genderName}
            genderName={genderName}
            subGenderNames={subGenderNames}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            handleSelectSubGender={handleSelectSubGender}
          />
        ))}
      </>
    );
  },
);

GenderList.displayName = "GenderList";

export default GenderList;
