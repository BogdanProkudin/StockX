import React from "react";

import { Link } from "react-router-dom";
import ProfileCard from "../../Cards/ProfileCard/ProfileCard";
import { purchasedProducts } from "../../../redux/slices/cartSlice";
import { fetchRequest } from "../../../@types/status";

interface orderProps {
  purchasedProducts: purchasedProducts[];
  status: fetchRequest;
}
const Order: React.FC<orderProps> = ({ purchasedProducts, status }) => {
  return (
    <>
      {status === fetchRequest.LOADING ? (
        "loading"
      ) : purchasedProducts.length > 0 ? (
        <div className="mt-6">
          {purchasedProducts.map((obj, id) => (
            <ProfileCard key={id} {...obj} />
          ))}
        </div>
      ) : (
        <div className="flex h-[40vh] flex-col items-center justify-center gap-5">
          <svg
            viewBox="0 0 80 80"
            focusable="false"
            className="chakra-icon css-ic4sgb h-32"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M49.9 25.2998H29.9V38.3998H49.9V25.2998Z"
              fill="#D4D1C7"
            ></path>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M45.9 1.2002H33.9L29.9 25.3002H49.9L45.9 1.2002Z"
              fill="#D4D1C7"
            ></path>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M79.5 79.4001H0V24.1001H79.5V79.4001ZM2.5 76.9001H77V26.6001H2.5V76.9001Z"
              fill="#D4D1C7"
            ></path>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M77.2 24.9L69.4 2.5H10.1L2.4 24.9L0 24.1L8.3 0H71.2L79.5 24.1L77.2 24.9Z"
              fill="#D4D1C7"
            ></path>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M55.8 69.7002H71.6"
              stroke="#D4D1C7"
              stroke-width="2"
              stroke-miterlimit="10"
            ></path>
          </svg>
          <p className="text-sm">
            You don't have any pending orders. Items that are being shipped to
            you will show up here.
          </p>
          <Link to="/">
            <button className="rounded-2xl bg-black px-4 py-2 text-white">
              Browse
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Order;
