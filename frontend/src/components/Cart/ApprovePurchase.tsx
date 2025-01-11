import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import BillingAddress from "./BillingAddress";
import PaymentMethod from "./PaymentMethod";
import { LoaderCircle } from "lucide-react";
import { setIsPurchased } from "../../redux/slices/cartSlice";
import axios from "../../axiosConfig/axios";

interface ApprovePurchaseProps {
  title: string | undefined;
  size: string | null;
  img: string | undefined;
}
const ApprovePurchase: React.FC<ApprovePurchaseProps> = ({
  title,
  size,
  img,
}) => {
  const dispatch = useAppDispatch();
  const price = useAppSelector((state) => state.cartSlice.price);
  const navigate = useNavigate();

  const [isBillingAddress, setIsBillingAddress] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
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

  const paymentMethod = localStorage.getItem("formDataPayment");
  const billingAddress = localStorage.getItem("BillingAddress");
  const token = localStorage.getItem("token");

  const onClickApprove = () => {
    if (!paymentMethod) {
      setIsPayment(true);
    }
    if (!billingAddress) {
      setIsBillingAddress(true);
    }
    if (billingAddress && paymentMethod) {
      setIsApprove(true);
    }
  };
  const onClickEditBills = () => {
    setIsBillingAddress(true);
  };
  const onClickPayment = () => {
    setIsPayment(true);
  };

  useEffect(() => {
    const sendProductData = async () => {
      setIsLoading(true);
      try {
        const productData = {
          title: title,
          size: size,
          price: price,
          img: img,
        };

        console.log("data", productData);

        const { data } = await axios.post("/purchasedProducts", {
          productData,
          token,
        });

        if (data.message == "Product purchased successfully") {
          navigate("/");
          dispatch(setIsPurchased(true));

          setTimeout(() => {
            dispatch(setIsPurchased(false));
          }, 6000);
        }
      } catch (error) {
        console.error("Error sending product data:", error);
      } finally {
        setIsLoading(false);
        setIsApprove(false);
      }
    };

    if (isApprove) {
      sendProductData();
    }
  }, [isApprove]);
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
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Approve"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ApprovePurchase;
