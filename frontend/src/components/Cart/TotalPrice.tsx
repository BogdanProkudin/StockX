import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { useAppSelector } from "../../redux/hook";
import { useSearchParams } from "react-router-dom";

interface TotalPriceProps {
  setShipping: () => void;
}
const TotalPrice: React.FC<TotalPriceProps> = ({ setShipping }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userShippingAddress = useAppSelector(
    (state) => state.cartSlice.userShippingAddress,
  );
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

  const formShipForm = localStorage.getItem("formDataShip");
  const onClickNext = () => {
    if (userShippingAddress && userShippingAddress.firstName) {
      searchParams.set("isConfirm", "true");
      setSearchParams(searchParams);
    } else {
      setShipping();
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={`border-l border-t border-l-[#cfcfcf] border-t-[#cfcfcf] bg-white px-7 py-5 ${
          isTotalPrice
            ? "absolute -top-40 left-0 w-full"
            : "relative flex items-center justify-between"
        }`}
        style={{
          width: isTotalPrice ? "" : "",
          transform: isTotalPrice ? "translateY(-57%)" : "translateY(0)",
        }}
      >
        <div>
          <span className="cursor-pointer" onClick={onClickFullTotalPrice}>
            <h4 className="flex items-center gap-2 text-lg">
              Subtotal:
              <span className="text-base font-bold text-[#006340]">
                €{subTotal.toFixed(2)}
              </span>
              {isTotalPrice ? <ChevronUp /> : <ChevronDown />}
            </h4>
          </span>
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
          <button
            onClick={onClickNext}
            className="rounded-full bg-[#006340] px-4 py-[6px] text-white transition-all duration-300 ease-in-out hover:bg-black"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalPrice;
