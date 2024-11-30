import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

const SizePopUp = () => {
  return (
    <div className="rounded-lg border border-[#a4a4a4] px-3 py-2">
      <b className="text-md flex justify-between">
        Size:
        <span className="flex items-center gap-1">
          All
          <ChevronDown size={20} />
        </span>
      </b>
    </div>
  );
};

export default SizePopUp;
