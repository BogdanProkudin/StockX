import { useState, useCallback } from "react";
import {
  setSelectedColor,
  setSelectedGender,
} from "../../../../redux/slices/searchSlice";
import ColorItem from "./ColorItem";
import { useAppDispatch } from "../../../../redux/hook";
import { useNavigate, useSearchParams } from "react-router-dom";

const ColorList = () => {
  const colors = ["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff"];
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
    <div>
      <ColorItem
        setIsShowDropDown={setIsShowDropDown}
        isShowDropDown={isShowDropDown}
        handleSelectSubColor={handleSelectSubColor}
        color={""}
      />
    </div>
  );
};

export default ColorList;
