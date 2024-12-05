import React, { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { setSelectedGender } from "../../../redux/slices/searchSlice";
import GenderItem from "./GenderItem";
import { useAppDispatch } from "../../../redux/hook";

interface Gender {
  genderName: string;
  subGenderNames: string[];
}

const genderListItems: Gender[] = [
  {
    genderName: "GENDER",
    subGenderNames: ["Men", "Women", "Unisex", "Child"],
  },
];

const GenderList = React.memo(() => {
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectSubGender = useCallback(
    (selectedGender: string) => {
      dispatch(setSelectedGender(selectedGender));

      const params = new URLSearchParams();
      setIsShowDropDown(false);
      params.set("gender", selectedGender);
      setSearchParams(params);
    },
    [dispatch, navigate],
  );

  return (
    <>
      {genderListItems.map(({ genderName, subGenderNames }) => (
        <GenderItem
          key={genderName}
          genderName={genderName}
          subGenderNames={subGenderNames}
          isShowDropDown={isShowDropDown}
          setIsShowDropDown={setIsShowDropDown}
          handleSelectSubGender={handleSelectSubGender}
        />
      ))}
    </>
  );
});

GenderList.displayName = "GenderList";

export default GenderList;
