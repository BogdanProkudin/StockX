import React from "react";
import { bottFooterArray } from "../../../assets/Footer/Footer";
const BottFooter = () => {
  return (
    <div className="bg-[#0f0f0f]">
      <div className="container px-[32px] py-[24px]">
        <div></div>
        <div className="flex justify-center gap-3">
          {bottFooterArray.map((el, id) => (
            <span
              className="cursor-pointer text-xs text-white hover:underline"
              key={id}
            >
              {el}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottFooter;
