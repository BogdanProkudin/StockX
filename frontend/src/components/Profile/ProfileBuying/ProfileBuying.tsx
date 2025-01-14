import { useEffect } from "react";
import TopNavigation from "./TopNavigation";
import { Search } from "lucide-react";
import { useAppDispatch } from "../../../redux/hook";
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
  const location = useLocation();

  useEffect(() => {
    dispatch(getPurchasedProducts());
    dispatch(getBidsPurchasedProducts());
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
      {location.pathname === "/buying/bids" ? (
        <Bids />
      ) : location.pathname === "/buying/order" ? (
        <Order />
      ) : (
        location.pathname === "/buying/history" && <History />
      )}
    </div>
  );
};

export default ProfileBuying;
