import { Euro } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { setBidVariant, setCartPrice } from "../../redux/slices/cartSlice";
import { variants } from "../FullProduct/SizePopUp";
import { useSearchParams } from "react-router-dom";
interface MakeOfferBlockProps {
  variants: variants[] | undefined;
}
const MakeOffer: React.FC<MakeOfferBlockProps> = ({ variants }) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const sizeQuery = searchParams.get("size");
  const price = variants?.find((el) => el.size === sizeQuery)?.price;

  const goodBid = Number(price) * 0.8;
  const betterBid = Number(price) * 0.9;

  const priceOptionArr = [
    { priceVariant: goodBid.toFixed(2), subTital: "Good Bid" },
    { priceVariant: betterBid.toFixed(2), subTital: "Better Bid" },
    {
      priceVariant: price,
      subTital: "Buy Now",
    },
  ];
  const initialVariant = String(priceOptionArr[1].priceVariant);
  const [isActive, setIsActive] = useState(1);
  const [value, setValue] = useState(initialVariant);
  const onClickVariant = (id: number, subTital: string) => {
    setIsActive(id);
    const variant = String(priceOptionArr[id].priceVariant);
    setValue(variant);
    dispatch(setBidVariant(subTital));
    dispatch(setCartPrice(Number(variant)));
  };
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValue(value);
  };
  useEffect(() => {
    const bid = priceOptionArr.find(
      (el) => el.priceVariant === value,
    )?.subTital;
    dispatch(setBidVariant(String(bid)));
    dispatch(setCartPrice(Number(value)));
  }, []);
  return (
    <div className="rounded-xl bg-white px-5 py-5">
      <h4 className="font-semibold">Pricing Options</h4>
      <div className="mb-5 flex items-center justify-between">
        {priceOptionArr.map((obj, id) => (
          <button
            onClick={() => onClickVariant(id, obj.subTital)}
            className={`mt-2 flex w-[155px] flex-col items-center rounded-lg border px-3 py-2 text-sm font-semibold transition-all duration-300 ease-in-out hover:border-[#006340] hover:bg-[#e5e5e5] ${
              isActive === id
                ? "cursor-default border-[#006340] bg-[#e5e5e5]"
                : "border-[#cfcfcf]"
            }`}
            key={obj.priceVariant}
          >
            <span>€{obj.priceVariant}</span>
            {obj.subTital}
          </button>
        ))}
      </div>
      <h3 className="mb-2 font-semibold">Or Name Your Price</h3>
      <div className="relative">
        <Euro className="absolute left-1 top-3" size={20} />
        <input
          onChange={(e) => onChangeValue(e)}
          className="h-[46px] w-full rounded-lg border border-[#cfcfcf] pl-7 text-lg outline-none transition-all duration-300 ease-in-out hover:border-[#006340] focus:border-[#006340]"
          type="number"
          value={value}
        />
        <p className="mt-1 text-center text-[#5f5f5f]">
          This is a competitive price that is more likely to match with a seller
        </p>
      </div>
    </div>
  );
};

export default MakeOffer;
