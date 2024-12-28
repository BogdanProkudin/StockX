import React from "react";

interface iPriceBlockProps {
  price: number | undefined;
}
const PriceBlock: React.FC<iPriceBlockProps> = ({ price }) => {
  return (
    <div className="flex h-[110px] flex-col rounded-xl bg-white px-5 py-6">
      Buy Now: <br />
      <span className="text-3xl font-bold">€{price}</span>
    </div>
  );
};

export default PriceBlock;
