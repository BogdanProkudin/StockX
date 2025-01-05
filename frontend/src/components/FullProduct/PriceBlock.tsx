import React, { useEffect, useState } from "react";
import { GenerateSoldItem } from "../../utils/updateSoldItems";

import model from "../../assets/images/soldModel.gif";
import PriceSkeleton from "./Skeletons/PriceSkeleton";
import LastPriceSkeleton from "./Skeletons/LastPriceSkeleton";
import { useNavigate, useSearchParams } from "react-router-dom";

interface PriceBlockProps {
  id: string | undefined;
  title: string | undefined;
  price: number | undefined;
  min_price: number | undefined;
  max_price: number | undefined;
  isPrice: number | null;
  loading: boolean;
  setSoldItems: (value: number) => void;
}
const PriceBlock: React.FC<PriceBlockProps> = ({
  price,
  title,
  min_price,
  max_price,
  isPrice,
  setSoldItems,
  loading,
}) => {
  const [randomItems, setRandomItems] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sizeQuery = searchParams.get("size");
  const totalPrice = Math.round(price ?? 0);
  const lastSalePrice = Math.round(min_price ?? 0);
  let lastSale: number = lastSalePrice;

  const maxPrice = Math.round(max_price ?? 0);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (totalPrice && maxPrice !== 0) {
      const soldItems = GenerateSoldItem(totalPrice, maxPrice);
      setRandomItems(soldItems);
      setSoldItems(soldItems);
    }
  }, [totalPrice, maxPrice]);

  const onClickBuy = () => {
    navigate(
      `/buy/${title}?${sizeQuery !== null ? "size=" + sizeQuery + `&` : ""}isBuy=true`,
    );
  };
  const onClickBid = () => {
    navigate(
      `/buy/${title}?${sizeQuery !== null ? "size=" + sizeQuery + `&` : ""}isBid=true`,
    );
  };
  return (
    <div className="rounded-xl border border-[#a4a4a4] p-4">
      <div className="flex items-center justify-between">
        <div className="w-[98px]">
          <p className="text-md font-medium">
            Buy Now For{" "}
            {loading ? (
              <PriceSkeleton />
            ) : (
              <span className="text-2xl font-bold">
                €{isPrice ? isPrice : totalPrice}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <img className="w-10" src={model} alt="sold model" />
          <p className="flex gap-2 font-semibold">
            <span>{loading ? <LastPriceSkeleton /> : randomItems}</span> Sold in
            Last 3 Days!
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={onClickBid}
          className="w-[212px] rounded-full border border-black px-8 py-[10px] font-bold transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
        >
          Place Bid
        </button>
        <button
          onClick={onClickBuy}
          className="w-[212px] rounded-full border bg-[#006340] px-8 py-[10px] font-bold text-white transition-all duration-300 ease-in-out hover:opacity-80"
        >
          Buy Now
        </button>
      </div>
      <div className="mt-5 flex items-center justify-between border-t pb-1 pt-3">
        <span className="flex font-semibold">
          Last Sale: {loading ? <LastPriceSkeleton /> : "€" + lastSale}
        </span>
        <span className="cursor-pointer border-b-2 border-[#006340] text-sm font-bold text-[#006340]">
          View Market Data
        </span>
      </div>
    </div>
  );
};

export default PriceBlock;
