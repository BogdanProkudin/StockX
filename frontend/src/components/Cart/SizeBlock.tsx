import React, { useEffect, useState } from "react";
import { variants } from "../FullProduct/SizePopUp";
import { useSearchParams } from "react-router-dom";

interface SizeBlockProps {
  variants: variants[] | undefined;
}
const SizeBlock: React.FC<SizeBlockProps> = ({ variants }) => {
  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedVariants, setSortedVariants] = useState<variants[] | undefined>(
    [],
  );
  useEffect(() => {
    variants?.sort(
      (a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size),
    );
    const sortedVariants = variants?.find((el) => el.size.includes("Y"))
      ? variants.sort(
          (big, small) =>
            Number(big.size.split("Y")[0]) - Number(small.size.split("Y")[0]),
        )
      : variants?.sort((big, small) => Number(big.size) - Number(small.size));
    setSortedVariants(sortedVariants);
  }, []);
  const onClickSize = (value: string) => {
    const updatedsearchParams = new URLSearchParams(searchParams);
    updatedsearchParams.set("size", value);
    setSearchParams(updatedsearchParams, { replace: true });
  };
  return (
    <div className="mt-5">
      <div className="scroll grid h-[420px] grid-cols-3 gap-7 overflow-y-scroll pr-4">
        {sortedVariants?.map((obj, id) => (
          <button
            onClick={() => onClickSize(obj.size)}
            className="flex flex-col items-center rounded-lg border border-[#a4a4a4] bg-white p-3 transition-all duration-300 ease-in-out hover:border-[#006340]"
            key={id}
          >
            <span>{obj.size}</span>
            <span className="text-sm font-bold text-[#006340]">
              €{obj.price}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeBlock;
