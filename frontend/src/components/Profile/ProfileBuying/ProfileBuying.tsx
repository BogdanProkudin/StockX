import { useEffect, useState } from "react";
import TopNavigation from "./TopNavigation";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  getBidsPurchasedProducts,
  getPurchasedProducts,
} from "../../../redux/slices/cartSlice";
import { useLocation } from "react-router-dom";
import Bids from "./Bids";
import Order from "./Order";
import History from "./History";

const ProfileBuying = () => {
  const dispatch = useAppDispatch();

  const { purchasedProducts, bidsPurchasedProducts } = useAppSelector(
    (state) => state.cartSlice,
  );
  const location = useLocation();
  const [value, setValue] = useState("");
  useEffect(() => {
    dispatch(getPurchasedProducts());
    dispatch(getBidsPurchasedProducts());
  }, []);
  const filteredOrders = purchasedProducts.filter((el) =>
    el.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
  );
  console.log("filter", filteredOrders);

  return (
    <div className="profileContainer">
      <TopNavigation />
      <div className="relative">
        <input
          className="w-full rounded-md border border-[#a4a4a4] px-4 py-3 pl-10 text-lg outline-none"
          type="text"
          placeholder="Search name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Search size={20} className="absolute left-2 top-4" />
      </div>
      <div className="mt-2 w-full border-b border-[#a4a4a4]">items</div>
      {location.pathname === "/buying/bids" ? (
        <Bids bidsPurchasedProducts={bidsPurchasedProducts} />
      ) : location.pathname === "/buying/order" ? (
        <Order
          purchasedProducts={value !== "" ? filteredOrders : purchasedProducts}
        />
      ) : (
        location.pathname === "/buying/history" && <History />
      )}
    </div>
  );
};

export default ProfileBuying;
