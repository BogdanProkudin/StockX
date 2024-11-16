import { useEffect } from "react";
import { userCardProps } from "../../../@types/userCardTypes";
import UserCard from "../../Cards/MainCard/MainCard";
import SearchedItem from "./SearchedItem";

type SearchedItemsListProps = {
  items: userCardProps[];
  isLoading: boolean;
};
const SearchedItemsList: React.FC<SearchedItemsListProps> = ({
  items,
  isLoading,
}) => {
  if (isLoading) {
    return <div>LOADING...</div>;
  }
  useEffect(() => {
    console.log(items);
  }, [items]);
  return (
    <div className="mt-5 grid w-full grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-4">
      {items.map((item) => (
        <SearchedItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default SearchedItemsList;
