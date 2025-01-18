import { useEffect, useState } from "react";
import TopNavigation from "./TopNavigation";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
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

  const { purchasedProducts, bidsPurchasedProducts } = useAppSelector(
    (state) => state.cartSlice,
  );
  const location = useLocation();
  useEffect(() => {
    dispatch(getPurchasedProducts());
    dispatch(getBidsPurchasedProducts());
  }, []);
  const sortVariants = [
    {
      key: "title",
      label: "Items",
      width: "380px",
      sortable: true,
    },
    {
      key: "id",
      label: "Id",
      width: "80px",
      sortable: false,
    },
    {
      key: "price",
      label: "Price",
      width: "85px",
      sortable: true,
    },
    {
      key: "date",
      label: "Date",
      width: "80px",
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
      console.log("sort price", sortedPrice);
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

  console.log("sorted arr", sortedOrders);

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
      <div className="mt-2 flex w-full items-center justify-between rounded-lg border border-[#006340] px-5">
        {sortVariants.map((obj, id) => (
          <span
            className={`flex w-[${obj.width}] justify-between border-r border-[#006340] py-2 pr-1 ${obj.sortable ? "cursor-pointer" : "cursor-default"}`}
            key={id}
          >
            {obj.label}
          </span>
        ))}
      </div>
      {location.pathname === "/buying/bids" ? (
        <Bids bidsPurchasedProducts={bidsPurchasedProducts} />
      ) : location.pathname === "/buying/order" ? (
        <Order
          purchasedProducts={
            value !== ""
              ? filteredOrders
              : sort.key && sort.value
                ? sortedOrders
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
{
  /* <span
onClick={() =>
  setSort({
    key: "title",
    value: sort.value === "asc" ? "desc" : "asc",
  })
}
className="flex w-[380px] cursor-pointer justify-between border-r border-[#006340] py-2 pr-1"
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
className="flex w-[85px] justify-between"
>
Price{" "}
{sort.key === "price" && sort.value === "asc" ? (
  <ChevronDown />
) : (
  <ChevronUp />
)}
</span>
<span
onClick={() =>
  setSort({
    key: "date",
    value: sort.value === "asc" ? "desc" : "asc",
  })
}
className="flex w-[80px] justify-between"
>
Date <ChevronUp />
</span>
<span className="flex w-[110px] justify-between">Status</span> */
}
