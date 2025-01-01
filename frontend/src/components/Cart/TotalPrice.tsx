import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { useAppSelector } from "../../redux/hook";

const TotalPrice: React.FC = () => {
  const price = useAppSelector((state) => state.cartSlice.price);
  const priceArr = [
    {
      name: "Item Price",
      itemPrice: price,
    },
    {
      name: "Processing Fee",
      itemPrice: 23.12,
    },
    {
      name: "Shipping",
      itemPrice: 15.95,
    },
  ];

  const subTotal = priceArr.reduce((acc, obj) => {
    return acc + Number(obj.itemPrice);
  }, 0);
  const [isTotalPrice, setIsTotalPrice] = useState(false);

  const onClickFullTotalPrice = () => {
    setIsTotalPrice(!isTotalPrice);
  };

  return (
    <div
      onClick={onClickFullTotalPrice}
      className={`relative cursor-pointer border-l border-t border-l-[#cfcfcf] border-t-[#cfcfcf] bg-white px-7 py-5 ${
        isTotalPrice ? "" : "flex items-center justify-between"
      }`}
      style={{
        transform: isTotalPrice ? "translateY(-57%)" : "translateY(0)",
      }}
    >
      <div>
        <h4 className="flex items-center gap-2 text-lg">
          Subtotal:
          <span className="text-base font-bold text-[#006340]">
            €{subTotal.toFixed(2)}
          </span>
          {isTotalPrice ? <ChevronUp /> : <ChevronDown />}
        </h4>
        {isTotalPrice && (
          <div className="absolute left-0 top-14 mt-2 w-full border-b border-[#cfcfcf]"></div>
        )}
        {isTotalPrice && (
          <div className="mb-3 mt-8">
            <ul>
              {priceArr.map((obj) => (
                <li className="flex justify-between border-b border-[#cfcfcf] py-3">
                  <span>{obj.name}</span>
                  <span>€{obj.itemPrice}</span>
                </li>
              ))}
              <li className="flex justify-between py-2">
                <span>Sub Total</span>
                <span className="text-lg font-bold">€{subTotal}</span>
              </li>
            </ul>
          </div>
        )}
        <p className="text-sm opacity-50">
          Includes Processing Fee. Final price calculated at checkout.
        </p>
      </div>
      <div className={`${isTotalPrice && "flex w-full justify-end"}`}>
        <button className="rounded-full bg-[#006340] px-4 py-[6px] text-white transition-all duration-300 ease-in-out hover:bg-black">
          Next
        </button>
      </div>
    </div>
  );
};

export default TotalPrice;
