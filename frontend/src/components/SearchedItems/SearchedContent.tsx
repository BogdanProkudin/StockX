import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchItemsQuery } from "../../redux/api/mainApiSlice";
import ChosenCategoryList from "./ChosenCategory/ChosenCategoryList";
import FilterBreadCrumb from "./FilterSelect/FilterBreadCrumb";
import FilterSelect from "./FilterSelect/FilterSelect";
import SearchedItemsList from "./SearchedItemsList/SearchedItemsList";
import { useAppSelector } from "../../redux/hook";

const SearchedContent = () => {
  const renderCount = useRef(0); // Хранит количество рендеров
  renderCount.current += 1;

  const [searchParams] = useSearchParams();
  const categoryNames = useAppSelector(
    (state) => state.searchSlice.categoryNames,
  );
  const searchQuery = searchParams.get("s") ? searchParams.get("s") : null;

  const { data, isLoading, isError, isSuccess } = useSearchItemsQuery(
    searchQuery ?? "",
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;
  console.log(`Render count: ${renderCount.current}`); // Логируем количество рендеров

  return (
    <div className="mt-3 flex h-full w-24 min-w-[1240px] items-start justify-between">
      <div className="h-full w-[300px] bg-red-500"></div>
      <div className="h-full w-[927px] p-2">
        <div className="flex h-10 justify-between">
          <FilterBreadCrumb />
          <FilterSelect />
        </div>
        {categoryNames.includes(`Search: "${searchQuery}"`) && (
          <h1 className="text-lg text-blackTextColor">
            Browse <b>1000</b> results for "nike"
          </h1>
        )}
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
};

export default SearchedContent;
