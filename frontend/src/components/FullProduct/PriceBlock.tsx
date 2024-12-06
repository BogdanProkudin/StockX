import React from "react";
import { GenerateSoldItem } from "../../utils/updateSoldItems";

import model from "../../assets/images/soldModel.gif";
interface PriceBlockProps {
  price: number;
  min_price: number;
  max_price: number;
  isPrice: number | null;
}
const PriceBlock: React.FC<PriceBlockProps> = ({
  price,
  min_price,
  max_price,
  isPrice,
}) => {
  const totalPrice = Math.round(price);
  const lastSalePrice = Math.round(min_price);
  let lastSale: number = lastSalePrice;
  if (lastSalePrice === totalPrice) {
    if (totalPrice < 100) {
      const random = Math.floor(Math.random() * 30);
      lastSale = lastSale + random;
    } else if (totalPrice < 500) {
      const random = Math.floor(Math.random() * 300);
      lastSale = lastSale + random;
    } else {
      const random = Math.floor(Math.random() * 600);
      lastSale = lastSale + random;
    }
  }
  const maxPrice = Math.round(max_price);
  const randomItems = GenerateSoldItem(totalPrice, maxPrice);

  return (
    <div className="rounded-xl border border-[#a4a4a4] p-4">
      <div className="flex items-center justify-between">
        <div className="w-[98px]">
          <p className="text-md font-medium">
            Buy Now For{" "}
            <span className="text-2xl font-bold">
              €{isPrice ? isPrice : totalPrice}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <img className="w-10" src={model} alt="sold model" />
          <p className="font-semibold">
            <span>{randomItems}</span> Sold in Last 3 Days!
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button className="w-[212px] rounded-full border border-black px-8 py-[10px] font-bold transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
          Place Bid
        </button>
        <button className="w-[212px] rounded-full border bg-[#006340] px-8 py-[10px] font-bold text-white transition-all duration-300 ease-in-out hover:opacity-80">
          Buy Now
        </button>
      </div>
      <div className="mt-5 flex items-center justify-between border-t pb-1 pt-3">
        <span className="font-semibold">Last Sale: €{lastSale}</span>
        <span className="cursor-pointer border-b-2 border-[#006340] font-bold text-[#006340]">
          View Market Data
        </span>
      </div>
    </div>
  );
};

export default PriceBlock;
