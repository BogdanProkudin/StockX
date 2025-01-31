import React from "react";
import { CallculateSellPrice } from "../../utils/CallculateSellPrice";
import { useNavigate, useSearchParams } from "react-router-dom";

interface SellBlockProps {
  sellPrice: number;
  title: string;
}
const SellBlock: React.FC<SellBlockProps> = ({ sellPrice, title }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sizeQuery = searchParams.get("size");
  const lastSale =
    sellPrice % 2 === 0
      ? Math.round(Math.random() * (sellPrice / 0.7))
      : Math.round(Math.random() * (sellPrice / 0.4));
  const lowestAsk = CallculateSellPrice(sellPrice);

  const onClickSell = () => {
    navigate(
      `/sell/${title}?${sizeQuery !== null ? "size=" + sizeQuery + `&` : ""}isSell=true`,
    );
  };
  const onClickPlace = () => {
    navigate(
      `/sell/${title}?${sizeQuery !== null ? "size=" + sizeQuery + `&` : ""}isPlace=true`,
    );
  };
  return (
    <div className="rounded-xl border border-[#a4a4a4] p-4">
      <div className="w-[98px]">
        <p className="text-md font-medium">
          Sell Now For <span className="text-2xl font-bold">€{sellPrice}</span>
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={onClickPlace}
          className="w-[212px] rounded-full border border-black px-8 py-[10px] font-bold transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
        >
          Place Ask
        </button>
        <button
          onClick={onClickSell}
          className="w-[212px] rounded-full border bg-[black] px-8 py-[10px] font-bold text-white transition-all duration-300 ease-in-out hover:opacity-80"
        >
          Sell Now
        </button>
      </div>
      <p className="my-3 text-sm font-semibold">Lowest Ask €{lowestAsk}</p>
      <div className="flex items-center justify-between border-t pb-1 pt-3">
        <span className="flex font-semibold">Last Sale: €{lastSale}</span>
        <span className="cursor-pointer border-b-2 border-[#006340] text-sm font-bold text-[#006340]">
          View Market Data
        </span>
      </div>
    </div>
  );
};

export default SellBlock;
