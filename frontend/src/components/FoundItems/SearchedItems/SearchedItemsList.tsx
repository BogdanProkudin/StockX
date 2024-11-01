import { useEffect } from "react";
import { useAppSelector } from "../../../redux/hook";
import SearchedItem from "./SearchedItem";
import React from "react";

const SearchedItemsList = () => {
  const foundeditems = useAppSelector(
    (state) => state.searchSlice.foundedItems,
  );

  return (
    <div className="flex w-full flex-col">
      {foundeditems.map((item) => {
        return (
          <SearchedItem
            image={item.image}
            brand={item.brand}
            name={item.title}
          />
        );
      })}
    </div>
  );
};
export default React.memo(SearchedItemsList);
