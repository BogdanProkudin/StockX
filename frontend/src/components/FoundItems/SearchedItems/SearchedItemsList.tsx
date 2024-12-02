import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import SearchedItem from "./SearchedItem";
import React from "react";
import useFetchOnView from "../../../hooks/useFetchOnView";
import { useLazyLoadMoreItemsQuery } from "../../../redux/api/mainApiSlice";
import { setFoundedItems } from "../../../redux/slices/searchSlice";

const SearchedItemsList = () => {
  const foundeditems = useAppSelector(
    (state) => state.searchSlice.foundedItems,
  );
  const [fetchLoadMoreItems, { data }] = useLazyLoadMoreItemsQuery({});
  const dispatch = useAppDispatch();
  const [pageCounter, setPageCounter] = useState(2);
  const searchValue = useAppSelector((state) => state.searchSlice.searchValue);
  const itemListRef = useFetchOnView({
    fetchFunction: fetchLoadMoreItems,
    sectionName: searchValue,
    page: pageCounter,
    threshold: 0,
    triggerOnce: false,
  });
  useEffect(() => {
    if (data) {
      dispatch(setFoundedItems({ data: [...foundeditems, ...data.data] }));
      setTimeout(() => {
        setPageCounter((prev) => prev + 1);
      }, 1000);
    }
  }, [data]);

  return (
    <div className="flex w-full flex-col">
      {foundeditems.map((item, index) => {
        return (
          <SearchedItem
            key={index}
            image={item.image}
            brand={item.brand}
            name={item.title}
            color={item.color}
            slug={item.slug}
          />
        );
      })}

      <div ref={itemListRef} className="mt-12 h-1 bg-black"></div>
    </div>
  );
};
export default React.memo(SearchedItemsList);
