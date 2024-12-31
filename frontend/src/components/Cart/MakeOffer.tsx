import { Euro } from "lucide-react";
import React, { useState } from "react";

interface MakeOfferProps {
  price: number | undefined;
}
const MakeOffer: React.FC<MakeOfferProps> = ({ price }) => {
  const [isActive, setIsActive] = useState(1);
  const [value, setValue] = useState("");
  const goodBid = Number(price) * 0.8;
  const betterBid = Number(price) * 0.9;

  const priceOptionArr = [
    { priceVariant: goodBid, subTital: "Good Bid" },
    { priceVariant: betterBid, subTital: "Better Bid" },
    {
      priceVariant: price,
      subTital: "Buy Now",
    },
  ];
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("value", priceOptionArr[isActive].priceVariant);

    const variant = String(priceOptionArr[isActive].priceVariant);
    setValue(value === "" ? variant : value);
  };
  return (
    <div className="rounded-xl bg-white px-5 py-5">
      <h4 className="font-semibold">Pricing Options</h4>
      <div className="mb-5 flex items-center justify-between">
        {priceOptionArr.map((obj, id) => (
          <button
            onClick={() => setIsActive(id)}
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
