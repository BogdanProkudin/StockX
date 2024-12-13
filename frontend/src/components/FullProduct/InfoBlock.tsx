import { ArrowRight, BadgeCheck, ChevronDown } from "lucide-react";
import React from "react";

const InfoBlock = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <button className="my-4 flex items-center gap-2 text-base font-bold text-[#006340]">
        Sell Now For €224 or Ask More
        <ArrowRight size={18} />
      </button>
      <div className="flex w-full cursor-pointer justify-between border-t border-[#a4a4a4] py-3">
        <div className="flex items-center gap-2">
          <b>Worry Free Purchasing</b>
          <span className="rounded-md bg-[#d4d4e8] px-[4px] py-[4px] text-xs">
            New
          </span>
        </div>
        <ChevronDown />
      </div>
      <div className="flex w-full cursor-pointer justify-between border-t border-[#a4a4a4] py-3">
        <b className="flex items-center gap-2">
          StockX Verified <BadgeCheck size={18} />
        </b>
        <b className="flex items-center gap-2 text-sm font-thin">
          Condition: <span className="text-[#006340]">New</span>
          <ChevronDown />
        </b>
      </div>
    </div>
  );
};

export default InfoBlock;
