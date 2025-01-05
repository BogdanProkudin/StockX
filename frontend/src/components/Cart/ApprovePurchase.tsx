import React, { useState } from "react";
import { useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import BillingAddress from "./BillingAddress";
import PaymentMethod from "./PaymentMethod";

interface ApprovePurchaseProps {
  title: string | undefined;
  size: string | null;
}
const ApprovePurchase: React.FC<ApprovePurchaseProps> = ({ title, size }) => {
  const price = useAppSelector((state) => state.cartSlice.price);
  const navigate = useNavigate();
  const [isBillingAddress, setIsBillingAddress] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const totalPrice = price + 23.12 + 15.95;
  const itemInfo = [
    {
      key: "Title:",
      value: title,
    },
    {
      key: "Size:",
      value: size,
    },
    {
      key: "Item Price:",
      value: "€" + price,
    },
    {
      key: "Processing Fee:",
      value: "€23.12",
    },
    {
      key: "Shipping:",
      value: "€15.95",
    },
    {
      key: "Total:",
      value: "€" + totalPrice,
    },
  ];
  const onClickApprove = () => {
    navigate("/");
  };
  const onClickEditBills = () => {
    setIsBillingAddress(true);
  };
  const onClickPayment = () => {
    setIsPayment(true);
  };
  return (
    <div className="px-7">
      {isBillingAddress ? (
        <BillingAddress setBills={() => setIsBillingAddress(false)} />
      ) : isPayment ? (
        <PaymentMethod setPayment={() => setIsPayment(false)} />
      ) : (
        <>
          <h1 className="mb-5 text-center text-xl font-bold">
            Approve Purchase
          </h1>
          <div className="mb-5 flex w-full justify-between rounded-lg bg-white px-4 py-3">
            <ul className="w-full">
              {itemInfo.map((obj, id) => (
                <li
                  className="flex justify-between border-b border-[#cfcfcf] py-3"
                  key={id}
                >
                  {obj.key} <span className={`font-semibold`}>{obj.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-5 flex w-full justify-between rounded-lg bg-white px-4 py-3">
            <span>Billing Address</span>
            <button
              onClick={onClickEditBills}
              className="text-sm font-semibold text-[#006340]"
            >
              Edit
            </button>
          </div>
          <div className="mb-10 flex w-full justify-between rounded-lg bg-white px-4 py-3">
            <span>Payment method</span>
            <button
              onClick={onClickPayment}
              className="text-sm font-semibold text-[#006340]"
            >
              Edit
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={onClickApprove}
              className="rounded-full bg-[#006340] px-8 py-2 text-white"
            >
              Approve
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ApprovePurchase;
