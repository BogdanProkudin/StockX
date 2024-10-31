import { useEffect } from "react";
import { useAppSelector } from "../../../redux/hook";
import SearchedItem from "./SearchedItem";

const SearchedItemsList = () => {
  const foundeditems = useAppSelector(
    (state) => state.searchSlice.foundedItems,
  );
  useEffect(() => {
    console.log("FOUNDED", foundeditems);
  }, [foundeditems]);
  return (
    <div className="flex w-full flex-col">
      <SearchedItem />
      <SearchedItem />
      <SearchedItem />
      <SearchedItem />
      <SearchedItem />
      <SearchedItem />
      <SearchedItem />
    </div>
  );
};
export default SearchedItemsList;
