import React from "react";
import { useSearchParams } from "react-router-dom";
import { userCardProps } from "../../../@types/userCardTypes";
import SearchedItem from "./SearchedItem";

type SearchedItemsListProps = {
  items: userCardProps[];
  isLoading: boolean;
};

const SearchedItemsList: React.FC<SearchedItemsListProps> = ({
  items,
  isLoading,
}) => {
  const [searchParams] = useSearchParams();
  const sortQuery: any = searchParams.get("sort");

  const sortData = (data: userCardProps[]) => {
    const sortFunctions: Record<
      string,
      (a: userCardProps, b: userCardProps) => number
    > = {
      priceAsc: (a, b) => a.base_price - b.base_price,
      priceDesc: (a, b) => b.base_price - a.base_price,
      releaseDate: (a, b) =>
        (new Date(b.release_date || 0).getTime() || 0) -
        (new Date(a.release_date || 0).getTime() || 0),
      alphabetical: (a, b) => a.title.localeCompare(b.title),
    };
    return sortFunctions[sortQuery]
      ? [...data].sort(sortFunctions[sortQuery])
      : data;
  };

  if (isLoading) return <div>Loading...</div>;

  const sortedItems = sortData(items);
  if (!sortedItems.length) return <div>No items found</div>;

  return (
    <div className="mt-5 grid w-full grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-4">
      {sortedItems.map((item) => (
        <SearchedItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default SearchedItemsList;
