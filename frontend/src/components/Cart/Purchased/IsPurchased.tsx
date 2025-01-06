import { BadgeCheck } from "lucide-react";
import React from "react";
import { useAppSelector } from "../../../redux/hook";

const IsPurchased = () => {
  const isPurchased = useAppSelector((state) => state.cartSlice.isPurchased);

  return (
    <div
      className={`fixed right-0 top-[280px] z-[99] flex h-[60px] items-center gap-2 border border-[#a4a4a4] bg-white pl-4 pr-8 transition-all duration-500 ease-in-out ${isPurchased ? "visible translate-x-0 opacity-100" : "invisible translate-x-full opacity-0"}`}
    >
      <BadgeCheck color={"#008000"} /> <span>Approved</span>
    </div>
  );
};

export default IsPurchased;
