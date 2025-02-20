import { useEffect, useState } from "react";
import TopNavigation from "./TopNavigation";
import { ChevronDown, ChevronsUpDown, ChevronUp, Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  getBidsPurchasedProducts,
  getPurchasedProducts,
  purchasedProducts,
} from "../../../redux/slices/cartSlice";
import { useLocation } from "react-router-dom";
import Bids from "./Bids";
import Order from "./Order";
import History from "./History";

const ProfileBuying = () => {
  const dispatch = useAppDispatch();

  const {
    purchasedProducts,
    bidsPurchasedProducts,
    bidsPurchasedStatus,
    purchasedStatus,
  } = useAppSelector((state) => state.cartSlice);
  const location = useLocation();
  useEffect(() => {
    dispatch(getPurchasedProducts());
    dispatch(getBidsPurchasedProducts());
  }, []);
  const sortVariants = [
    {
      key: "title",
      label: "Items",
      width: "435px",
      sortable: true,
    },
    {
      key: "id",
      label: "Id",
      width: "180px",
      sortable: false,
    },
    {
      key: "price",
      label: "Price",
      width: "185px",
      sortable: true,
    },
    {
      key: "date",
      label: "Date",
      width: "180px",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      width: "110px",
      sortable: false,
    },
  ];
  const [value, setValue] = useState("");

  const [sort, setSort] = useState<{
    key: string | null;
    value: string | null;
  }>({
    key: null,
    value: null,
  });
  const [sortedOrders, setSortedOrders] = useState<purchasedProducts[]>([]);
  const filteredOrders = purchasedProducts.filter((el) =>
    el.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
  );
  useEffect(() => {
    if (sort.key === "price") {
      const sortedPrice =
        sort.key === "price" && sort.value === "asc"
          ? [...purchasedProducts].sort((a, b) => a.price - b.price)
          : [...purchasedProducts].sort((a, b) => b.price - a.price);
      setSortedOrders(sortedPrice);
    }
    if (sort.key === "title") {
      const sortedTitle =
        sort.key === "title" && sort.value === "asc"
          ? [...purchasedProducts].sort((a, b) =>
              a.title.localeCompare(b.title),
            )
          : [...purchasedProducts].sort((a, b) =>
              b.title.localeCompare(a.title),
            );
      setSortedOrders(sortedTitle);
    }
    if (sort.key === "date") {
      const sortedDate =
        sort.key === "date" && sort.value === "asc"
          ? [...purchasedProducts].sort(
              (a, b) =>
                new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime(),
            )
          : [...purchasedProducts].sort(
              (a, b) =>
                new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
            );
      setSortedOrders(sortedDate);
    }
  }, [sort.key, sort.value]);

  return (
    <div className="profileContainer">
      <TopNavigation />
      <div className="relative">
        <input
          className="w-full rounded-md border border-[#a4a4a4] px-4 py-2 pl-10 text-lg outline-none"
          type="text"
          placeholder="Search name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Search size={20} className="absolute left-2 top-3" />
      </div>
      {location.pathname === "/buying/order" &&
        purchasedProducts.length > 0 && (
          <div className="mt-2 flex w-full items-center rounded-lg border px-1">
            {sortVariants.map((obj, id) => (
              <span
                style={{ width: obj.width }}
                className={`flex items-center justify-between border-r px-2 py-2 pr-1 last:justify-center last:border-r-0 ${obj.sortable ? "cursor-pointer" : "cursor-default"}`}
                key={id}
                onClick={
                  obj.sortable
                    ? () =>
                        setSort({
                          key: obj.key,
                          value: sort.value === "asc" ? "desc" : "asc",
                        })
                    : undefined
                }
              >
                {obj.label}
                {obj.sortable &&
                  (sort.key === obj.key ? (
                    sort.value === "asc" ? (
                      <ChevronDown />
                    ) : (
                      <ChevronUp />
                    )
                  ) : (
                    <ChevronsUpDown size={18} />
                  ))}
              </span>
            ))}
          </div>
        )}
      {location.pathname === "/buying/bids" ? (
        <Bids
          bidsPurchasedProducts={bidsPurchasedProducts}
          status={bidsPurchasedStatus}
        />
      ) : location.pathname === "/buying/order" ? (
        <Order
          purchasedProducts={
            value !== ""
              ? filteredOrders
              : sort.key && sort.value
                ? sortedOrders
                : purchasedProducts
          }
          status={purchasedStatus}
        />
      ) : (
        location.pathname === "/buying/history" && <History />
      )}
    </div>
  );
};

export default ProfileBuying;
