import React from "react";
import { getRandomEvery30Seconds } from "../../utils/updateSoldItems";
import model from "../../assets/images/soldModel.gif";
interface PriceBlockProps {
  price: number;
  lastSale: number;
}
const PriceBlock: React.FC<PriceBlockProps> = ({ price, lastSale }) => {
  const totalPrice = Math.round(price);
  const lastSalePrice = Math.round(lastSale);

  const randomItems = getRandomEvery30Seconds();
  return (
    <div className="h-[160px] w-[430px] rounded-xl border border-[#a4a4a4] p-4">
      <div className="flex items-center justify-between">
        <div className="w-[98px]">
          <p className="text-sm font-medium">
            Buy Now For <span className="text-xl font-bold">€{totalPrice}</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <img className="w-10" src={model} alt="sold model" />
          <p className="font-semibold">
            <span>{randomItems}</span> Sold in Last 3 Days!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceBlock;
