import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useNavigate, useSearchParams } from "react-router-dom";
import BillingAddress from "./BillingAddress";
import PaymentMethod from "./PaymentMethod";
import { LoaderCircle } from "lucide-react";
import { setIsPurchased } from "../../redux/slices/cartSlice";
import axios from "../../axiosConfig/axios";
import { variants } from "../FullProduct/SizePopUp";
import AddShippingForm from "../Profile/ProfileDetails/ShippingInformation/AddShippingForm/AddShippingForm";
import { log } from "node:console";
import { GetBillingAddress } from "../../redux/thunks/cartThunks";

interface ApprovePurchaseProps {
  title: string | undefined;
  size: string | null;
  img: string | undefined;
  brand: string | undefined;
  sku: string | undefined;
  variant: variants[] | undefined;
}
const ApprovePurchase: React.FC<ApprovePurchaseProps> = ({
  title,
  size,
  img,
  brand,
  sku,
  variant,
}) => {
  const dispatch = useAppDispatch();
  const { price, bidVariant } = useAppSelector((state) => state.cartSlice);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const buyQuery = searchParams.get("isBuy");
  const billingAddress = useAppSelector(
    (state) => state.cartSlice.selectedBillingAddress,
  );
  const [isBillingAddress, setIsBillingAddress] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const priceVariant = buyQuery
    ? variant?.find((el) => el.size === size)?.price
    : price;
  const totalPrice = Number(priceVariant) + 23.12 + 15.95;
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
      value: "€" + priceVariant,
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
      value: "€" + totalPrice.toFixed(2),
    },
  ];
  useEffect(() => {
    const handleGetBillingAddress = async () => {
      if (!token) {
        return;
      }
      await dispatch(GetBillingAddress({ token }));
    };
    handleGetBillingAddress();
  }, []);
  const paymentMethod = localStorage.getItem("formDataPayment");

  const token = localStorage.getItem("token");

  const onClickApprove = () => {
    console.log(billingAddress);

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
  console.log(billingAddress, "1");

  useEffect(() => {
    const sendProductOrderData = async () => {
      setIsLoading(true);
      try {
        const productData = {
          title: title,
          size: size,
          price: priceVariant,
          img: img,
          brand: brand,
          sku: sku,
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
    const sendProductBidData = async () => {
      setIsLoading(true);
      try {
        const productData = {
          title: title,
          size: size,
          price: price,
          img: img,
          bidVariant: bidVariant,
          brand: brand,
          sku: sku,
        };

        console.log("data", productData);

        const { data } = await axios.post("/bidsPurchasedProducts", {
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
    if (isApprove && buyQuery === "true") {
      sendProductOrderData();
    } else if (isApprove && buyQuery === null) {
      sendProductBidData();
    }
  }, [isApprove]);
  return (
    <div className="px-7">
      {isBillingAddress && !billingAddress ? (
        <AddShippingForm
          version="BillingAddress"
          setIsOpen={setIsBillingAddress}
        />
      ) : billingAddress && billingAddress.firstName && isPayment ? (
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
            <span>{`Billing Address:  ${billingAddress && billingAddress.firstName.length > 1 && billingAddress.country + " " + billingAddress.city + " " + billingAddress.address}`}</span>

            <button
              onClick={onClickEditBills}
              className="text-sm font-semibold text-[#006340]"
            >
              Edit
            </button>
          </div>
          <div className="mb-8 flex w-full justify-between rounded-lg bg-white px-4 py-3">
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
