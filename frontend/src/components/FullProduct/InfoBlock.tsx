import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookHeart,
  ChevronDown,
  HandCoins,
} from "lucide-react";
import React, { useState } from "react";
import { CallculateSellPrice } from "../../utils/CallculateSellPrice";

interface InfoBlockProps {
  sellVisible: boolean;
  setSellVisible: (value: boolean) => void;
  setSellPrice: (value: number) => void;
  price: number;
}
const InfoBlock: React.FC<InfoBlockProps> = ({
  sellVisible,
  setSellVisible,
  price,
  setSellPrice,
}) => {
  const purchaseInfo = [
    {
      image: <HandCoins size={24} />,
      title: "No Fee Resale",
      description:
        "Don’t love it? Resell your purchase without any fees within 90 days of delivery.",
    },
    {
      image: <BookHeart size={24} />,
      title: "No Fee Resale",
      description:
        "Don’t love it? Resell your purchase without any fees within 90 days of delivery.",
    },
  ];
  const [purchase, setPurchase] = useState(false);
  const [verified, setVerified] = useState(false);

  const priceForBuy = Math.round(price);
  const priceForSell = CallculateSellPrice(priceForBuy);

  const onClickPurchase = () => {
    setPurchase(!purchase);
  };
  const onClickVerified = () => {
    setVerified(!verified);
  };
  const onClickSell = () => {
    setSellVisible(!sellVisible);
    setSellPrice(priceForSell);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {sellVisible ? (
        <button
          onClick={onClickSell}
          className="my-4 flex items-center gap-2 text-base font-bold text-[#006340] hover:text-[#288263]"
        >
          <ArrowLeft size={18} />
          Buy Now For €{priceForBuy} or Bid for Less
        </button>
      ) : (
        <button
          onClick={onClickSell}
          className="my-4 flex items-center gap-2 text-base font-bold text-[#006340] hover:text-[#288263]"
        >
          Sell Now For €{priceForSell} or Ask More
          <ArrowRight size={18} />
        </button>
      )}

      <div
        onClick={onClickPurchase}
        className="flex w-full cursor-pointer justify-between border-t border-[#eeeeee] py-3 transition-all duration-300 ease-in-out hover:bg-[#eaeaea54]"
      >
        <div className="flex items-center gap-2">
          <b>Worry Free Purchasing</b>
          <span className="rounded-md bg-[#d4d4e8] px-[4px] py-[4px] text-xs">
            New
          </span>
        </div>
        <span
          className={`transform transition-transform duration-300 ${
            purchase ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown />
        </span>
      </div>

      <div
        className={`duration-400 overflow-hidden transition-[max-height] ease-in-out ${
          purchase ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="p-3">
          <h3 className="mb-3 text-sm">
            StockX is a live marketplace that provides the following options so
            you can purchase confidently
          </h3>
          {purchaseInfo.map((obj, id) => (
            <div className="mb-3 flex gap-2" key={id}>
              {obj.image}
              <div>
                <h3 className="text-sm font-bold">{obj.title}</h3>
                <p className="text-sm">
                  {obj.description}{" "}
                  <span className="cursor-pointer border-b border-[#006340] font-bold text-[#006340]">
                    Learn More
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        onClick={onClickVerified}
        className="flex w-full cursor-pointer justify-between border-t border-[#eeeeee] py-3 transition-all duration-300 ease-in-out hover:bg-[#eaeaea54]"
      >
        <b className="flex items-center gap-2">
          StockX Verified <BadgeCheck size={18} />
        </b>
        <b className="flex items-center gap-2 text-sm font-thin">
          Condition: <span className="text-[#006340]">New</span>
          <span
            className={`transform transition-transform duration-300 ${
              verified ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDown />
          </span>
        </b>
      </div>

      <div
        className={`my-3 overflow-hidden text-sm transition-[max-height] duration-300 ease-in-out ${
          verified ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        StockX Verified is our own designation and means that we inspect every
        item, every time.Learn More
      </div>
    </div>
  );
};

export default InfoBlock;
