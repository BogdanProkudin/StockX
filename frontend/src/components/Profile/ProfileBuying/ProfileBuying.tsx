import React, { useEffect } from "react";
import TopNavigation from "./TopNavigation";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getPurchasedProducts } from "../../../redux/slices/cartSlice";

const ProfileBuying = () => {
  const dispatch = useAppDispatch();
  const { purchasedProducts } = useAppSelector((state) => state.cartSlice);
  console.log("purchased items", purchasedProducts);

  useEffect(() => {
    dispatch(getPurchasedProducts());
  }, []);
  return (
    <div className="profileContainer">
      <TopNavigation />
      <div className="relative">
        <input
          className="w-full rounded-md border border-[#a4a4a4] px-4 py-3 pl-10 text-lg outline-none"
          type="text"
          placeholder="Search name"
        />
        <Search size={20} className="absolute left-2 top-4" />
      </div>
      {/* <div>
        {purchasedProducts.map((el) => (
          <p>{el}</p>
        ))}
      </div> */}
    </div>
  );
};

export default ProfileBuying;
