import { useEffect, useState } from "react";
import TopNavigation from "./TopNavigation";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
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
  useEffect(() => {
    dispatch(getPurchasedProducts());
    dispatch(getBidsPurchasedProducts());
  }, []);
  const [value, setValue] = useState("");
  const [sort, setSort] = useState<{
    key: string | null;
    value: string | null;
  }>({
    key: null,
    value: null,
  });

  const filteredOrders = purchasedProducts.filter((el) =>
    el.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
  );

  const sortedPrice =
    sort.key === "price" && sort.value === "asc"
      ? [...purchasedProducts].sort((a, b) => a.price - b.price)
      : [...purchasedProducts].sort((a, b) => b.price - a.price);
  const sortedTitle =
    sort.key === "title" && sort.value === "asc"
      ? [...purchasedProducts].sort((a, b) => a.title.localeCompare(b.title))
      : [...purchasedProducts].sort((a, b) => b.title.localeCompare(a.title));

  console.log("sorted title", sortedTitle);

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
      <div className="mt-2 flex w-full items-center justify-between border-b border-[#a4a4a4]">
        <span
          onClick={() =>
            setSort({
              key: "title",
              value: sort.value === "asc" ? "desc" : "asc",
            })
          }
          className="flex w-[380px] justify-between"
        >
          Items <ChevronUp />
        </span>
        <span className="flex w-[80px] justify-between">Id</span>
        <span
          onClick={() =>
            setSort({
              key: "price",
              value: sort.value === "asc" ? "desc" : "asc",
            })
          }
          className="flex w-[75px] justify-between"
        >
          Price{" "}
          {sort.key === "price" && sort.value === "asc" ? (
            <ChevronDown />
          ) : (
            <ChevronUp />
          )}
        </span>
        <span className="flex w-[90px] justify-between">
          Date <ChevronUp />
        </span>
        <span className="flex w-[90px] justify-between">
          Status <ChevronUp />
        </span>
      </div>
      {location.pathname === "/buying/bids" ? (
        <Bids bidsPurchasedProducts={bidsPurchasedProducts} />
      ) : location.pathname === "/buying/order" ? (
        <Order
          purchasedProducts={
            value !== ""
              ? filteredOrders
              : sort.key === "price"
                ? sortedPrice
                : sort.key === "title"
                  ? sortedTitle
                  : purchasedProducts
          }
        />
      ) : (
        location.pathname === "/buying/history" && <History />
      )}
    </div>
  );
};

export default ProfileBuying;
