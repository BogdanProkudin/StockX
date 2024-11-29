import { useSearchParams } from "react-router-dom";
import {
  useLazySearchItemsQuery,
  useSearchItemsQuery,
} from "../../redux/api/mainApiSlice";
import ChosenCategoryList from "./ChosenCategory/ChosenCategoryList";
import FilterBreadCrumb from "./BreadCramb/BreadCrumb";
import FilterSelect from "./FilterSelect/FilterSelect";

import SearchedItemsList from "./SearchedItemsList/SearchedItemsList";

import CategoryList from "./CategoryList/CategoryList";
import { useEffect } from "react";

const SearchedContent = () => {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("s") ? searchParams.get("s") : null;
  const categoryQuery = searchParams.get("category")
    ? searchParams.get("category")
    : null;

  const [fetchData, { data, isLoading }] = useLazySearchItemsQuery();
  useEffect(() => {
    fetchData({
      searchingValue: [searchQuery, categoryQuery].filter(Boolean).join(" "),
    });
  }, [searchQuery, categoryQuery]);
  return (
    <div className="mt-3 flex h-full w-24 min-w-[1240px] items-start justify-between">
      <div className="h-full w-[300px]">
        <CategoryList />
      </div>
      <div className="h-full w-[927px] p-2">
        <div className="flex h-10 justify-between">
          <FilterBreadCrumb isLoading={isLoading} />
          <FilterSelect isLoading={isLoading} />
        </div>

        <h1 className="text-lg text-blackTextColor">
          {searchQuery &&
            `Browse ${isLoading ? "..." : "1000"} results for ${searchQuery}`}
        </h1>

        <div className="flex flex-col">
          <ChosenCategoryList isLoading={isLoading} fetchData={fetchData} />
          <SearchedItemsList items={data && data.data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default SearchedContent;
