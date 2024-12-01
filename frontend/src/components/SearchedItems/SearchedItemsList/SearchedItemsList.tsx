import React from "react";
import { useSearchParams } from "react-router-dom";
import { SearchItem } from "../../../types/searchTypes";
import SearchedItem from "./SearchedItem";
import SearchedItemSkeleton from "./SearchedItemSkeleton";
import { sortItems } from "../../../utils/sortUtils";

interface SearchedItemsListProps {
  items?: SearchItem[];
  isLoading: boolean;
  total: number;
  currentPage: number;
  totalPages: number;
}

const SearchedItemsList: React.FC<SearchedItemsListProps> = ({
  items,
  isLoading,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortQuery = searchParams.get("sort");

  if (isLoading || !items) return <SearchedItemSkeleton />;
  if (!items.length)
    return <div className="mt-4 text-center">No items found</div>;

  const sortedItems = sortItems(items, sortQuery);

  return (
    <>
      <div className="mt-5 grid w-full grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-4">
        {sortedItems.map((item) => (
          <SearchedItem key={item.id} {...item} />
        ))}
      </div>
      <div></div>
    </>
  );
};

export default SearchedItemsList;
