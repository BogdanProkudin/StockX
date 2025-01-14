import React from "react";
import { useSearchParams } from "react-router-dom";
import { SearchItem } from "../../../types/searchTypes";
import SearchedItem from "./SearchedItem";
import SearchedItemSkeleton from "./SearchedItemSkeleton";
import { sortItems } from "../../../utils/sortUtils";
import Pagination from "../Pagination/Pagination";

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
  const currentPage = Number(searchParams.get("page")) || 1;
  if (isLoading || !items) return <SearchedItemSkeleton />;
  const handlePageClick = (selectedPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", selectedPage.toString());
    setSearchParams(newSearchParams);
  };
  if (!items.length)
    return (
      <div className="mediumSmallScreen:h-[30rem] flex h-[26rem] flex-col items-center justify-between">
        <div className="mt-[9rem] text-center">
          No items found. Try another page or try changing or clearing your
          filters.
        </div>
        <Pagination
          pageCount={25}
          currentPage={currentPage}
          onPageChange={handlePageClick}
        />
      </div>
    );

  const sortedItems = sortItems(items, sortQuery);

  return (
    <>
      <div className="mediumScreen:grid-cols-2 mediumLargeScreen:grid-cols-3 mt-5 grid w-full grid-cols-4 items-start gap-6">
        {sortedItems.map((item) => (
          <SearchedItem key={item.id} {...item} />
        ))}
      </div>
      <div className="mt-5 flex justify-center">
        <Pagination
          pageCount={25}
          currentPage={currentPage}
          onPageChange={handlePageClick}
        />
      </div>
    </>
  );
};

export default SearchedItemsList;
