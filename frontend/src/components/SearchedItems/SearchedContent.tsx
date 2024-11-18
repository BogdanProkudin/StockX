import { useSearchParams } from "react-router-dom";
import { useSearchItemsQuery } from "../../redux/api/mainApiSlice";
import ChosenCategoryList from "./ChosenCategory/ChosenCategoryList";
import FilterBreadCrumb from "./FilterSelect/FilterBreadCrumb";
import FilterSelect from "./FilterSelect/FilterSelect";

import SearchedItemsList from "./SearchedItemsList/SearchedItemsList";

const SearchedContent = () => {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("s") ? searchParams.get("s") : null;

  const { data, isLoading, isError, isSuccess } = useSearchItemsQuery(
    searchQuery ?? "",
  );

  return (
    <div className="mt-3 flex h-full w-24 min-w-[1240px] items-start justify-between">
      <div className="h-full w-[300px] bg-red-500"></div>
      <div className="h-full w-[927px] p-2">
        <div className="flex h-10 justify-between">
          <FilterBreadCrumb />
          <FilterSelect />
        </div>
        <h1 className="text-lg text-blackTextColor">
          Browse <b>1000</b> results for "nike"
        </h1>
        <div className="flex flex-col">
          <ChosenCategoryList />
          <SearchedItemsList items={data && data.data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default SearchedContent;
