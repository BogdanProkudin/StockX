import React, { useEffect, useState } from "react";
import { variants } from "../FullProduct/SizePopUp";
import { useSearchParams } from "react-router-dom";
import { SizeVariants } from "../../utils/SizeVariants";

interface SizeBlockProps {
  variants: variants[] | undefined;
}
const SizeBlock: React.FC<SizeBlockProps> = ({ variants }) => {
  const [sellVariants, setSellVariants] = useState<string[] | number[]>([]);
  useEffect(() => {
    if (variants) {
      const sellVariants = SizeVariants(variants);
      setSellVariants(sellVariants);
    }
  }, []);
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickSize = (value: string) => {
    const updatedsearchParams = new URLSearchParams(searchParams);
    updatedsearchParams.set("size", value);
    setSearchParams(updatedsearchParams, { replace: true });
  };
  return (
    <div className="mt-5">
      <div className="mb-2 grid grid-cols-3 gap-7 pr-4">
        {sellVariants?.map((el, id) => (
          <button
            onClick={() => onClickSize(String(el))}
            className="flex max-h-[80px] flex-col items-center rounded-lg border border-[#a4a4a4] bg-white p-3 transition-all duration-300 ease-in-out hover:border-[#006340]"
            key={id}
          >
            <span>{el}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeBlock;
