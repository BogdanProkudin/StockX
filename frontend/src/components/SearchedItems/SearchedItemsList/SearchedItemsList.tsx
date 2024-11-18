import { useEffect } from "react";
import { userCardProps } from "../../../@types/userCardTypes";
import SearchedItem from "./SearchedItem";
import { useSearchParams } from "react-router-dom";

type SearchedItemsListProps = {
  items: userCardProps[];
  isLoading: boolean;
};

const SearchedItemsList: React.FC<SearchedItemsListProps> = ({
  items,
  isLoading,
}) => {
  // Функция для сортировки данных
  const sortData = (data: userCardProps[]) => {
    switch (sortQuery) {
      case "priceAsc":
        return data.slice().sort((a, b) => a.base_price - b.base_price);
      case "priceDesc":
        return data.slice().sort((a, b) => b.base_price - a.base_price);
      case "releaseDate":
        return data.slice().sort((a, b) => {
          const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
          const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
          return dateB - dateA;
        });
      case "alphabetical":
        return data.slice().sort((a, b) => a.title.localeCompare(b.title));
      default:
        return data;
    }
  };

  if (isLoading) {
    return <div>LOADING...</div>;
  }
  const [searchParams] = useSearchParams();
  const sortQuery = searchParams.get("sort");

  useEffect(() => {
    console.log("Query was changed:", sortQuery);
  }, [sortQuery]);
  const sortedItems = sortData(items);
  useEffect(() => {
    console.log("изменились айтемы", items);
  }, [items]);
  useEffect(() => {
    console.log("сортированные айтемы", sortedItems);
  }, [sortedItems]);

  return (
    <div className="mt-5 grid w-full grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-4">
      {sortedItems.map((item) => (
        <SearchedItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default SearchedItemsList;
