import { useSearchParams } from "react-router-dom";
import {
  useLazySearchItemsQuery,
  useSearchItemsQuery,
} from "../../redux/api/mainApiSlice";
import ChosenCategoryList from "./ChosenCategory/ChosenCategoryList";
import FilterBreadCrumb from "./FilterSelect/FilterBreadCrumb";
import FilterSelect from "./FilterSelect/FilterSelect";
import { useEffect } from "react";
import SearchedItemsList from "./SearchedItemsList/SearchedItemsList";

const SearchedContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("s");
  if (searchQuery === null) {
    return <div>ERROR</div>;
  }
  const { data, isLoading, isError, isSuccess } =
    useSearchItemsQuery(searchQuery);

  return (
    <div className="mt-3 flex h-full w-24 min-w-[1240px] items-start justify-between">
      <div className="h-full w-[300px] bg-red-500"></div>
      <div className="h-full w-[927px] p-2">
        <div className="flex h-10 justify-between">
          <FilterBreadCrumb />
          <FilterSelect />
        </div>
        <h1 className="text-blackTextColor text-lg">
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
