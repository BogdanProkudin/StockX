import { useState, useCallback } from "react";
import {
  setSelectedColor,
  setSelectedGender,
} from "../../../../redux/slices/searchSlice";
import ColorItem from "./ColorItem";
import { useAppDispatch } from "../../../../redux/hook";
import { useNavigate, useSearchParams } from "react-router-dom";

const ColorList = () => {
  const subColors = [
    "Black",
    "White",
    "Blue",
    "Pink",
    "Red",
    "Brown",
    "Grey",
    "Yellow",
    "Purple",
    "Orange",
    "Green",
    "Beige",
  ];

  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSelectSubColor = useCallback(
    (selectedColor: string) => {
      dispatch(setSelectedColor(selectedColor));
      setIsShowDropDown(false);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("color", selectedColor);
      setSearchParams(newSearchParams);
    },
    [dispatch, searchParams, navigate],
  );
  return (
    <>
      <ColorItem
        setIsShowDropDown={setIsShowDropDown}
        isShowDropDown={isShowDropDown}
        handleSelectSubColor={handleSelectSubColor}
        subColors={subColors}
      />
    </>
  );
};

export default ColorList;
