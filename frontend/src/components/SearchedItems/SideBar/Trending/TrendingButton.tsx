import React, { useState } from "react";

interface TrendingButtonProps {
  onChange?: (isChecked: boolean) => void;
}

const TrendingButton: React.FC<TrendingButtonProps> = ({ onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    console.log("change");
  };

  return (
    <div className="flex h-full w-full items-center border-b-2 border-t-2 border-E2E8F0 p-2">
      <div
        onClick={() => handleChange()}
        className="user-select-none relative top-1 block w-[55px] cursor-pointer"
      >
        <div
          className={`relative inline-block h-[35px] w-[55px] rounded-[25px] bg-[#f0f0f0] p-[2px] transition-all duration-150 ${isChecked ? "bg-[#34bfa3]" : ""}`}
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
