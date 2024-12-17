import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { setCategoryNames } from "../../../../redux/slices/searchSlice";

interface TrendingButtonProps {
  onChange?: (isChecked: boolean) => void;
}

const TrendingButton: React.FC<TrendingButtonProps> = ({ onChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useAppDispatch();
  const categoryNames = useAppSelector(
    (state) => state.searchSlice.categoryNames,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("trending", "Trending");
      setSearchParams(newSearchParams);
    } else {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("trending");
      setSearchParams(newSearchParams);
    }
    console.log("change");
  };
  useEffect(() => {
    if (searchParams.get("trending") === "Trending") {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [searchParams]);

  return (
    <div className="flex h-full w-full items-center border-b-2 border-t-2 border-E2E8F0 p-2">
      <div
        onClick={() => handleChange()}
        className="user-select-none relative top-1 block w-[55px] cursor-pointer"
      >
        <div
          className={`relative inline-block h-[35px] w-[55px] rounded-[25px] bg-[#f0f0f0] p-[2px] transition-all duration-150 ${isChecked ? "bg-green-600" : ""}`}
        >
          <div
            className={`absolute top-[5px] h-[25px] w-[25px] rounded-[50%] bg-white transition-all duration-1000 ${
              isChecked ? "right-[3px]" : "left-[3px]"
            }`}
          />
        </div>
      </div>
      <span className="ml-4 select-none pb-0 text-center text-[16px] font-normal text-blackTextColor">
        Trending
      </span>
    </div>
  );
};

export default TrendingButton;
