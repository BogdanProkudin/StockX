import { useSearchParams } from "react-router-dom";
import {
  useLazySearchItemsQuery,
  useSearchItemsQuery,
} from "../../redux/api/mainApiSlice";
import ChosenCategoryList from "./ChosenCategory/ChosenCategoryList";
import FilterBreadCrumb from "./FilterSelect/FilterBreadCrumb";
import FilterSelect from "./FilterSelect/FilterSelect";
import { useEffect } from "react";

const SearchedContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("s");
  if (searchQuery === null) {
    return <div>ERROR</div>;
  }
  const { data, isLoading, isError, isSuccess } =
    useSearchItemsQuery(searchQuery);

  useEffect(() => {
    if (!data) {
      console.log("LOADING");
    } else {
      console.log("DAta", data);
    }
  }, [data]);
  return (
    <div className="mt-3 flex h-[400px] w-24 min-w-[1240px] justify-between bg-slate-950">
      <div className="h-[300px] w-[300px] bg-red-500"></div>
      <div className="h-[300px] w-[927px] bg-amber-500 p-4">
        <div className="flex h-10 justify-between">
          <FilterBreadCrumb />
          <FilterSelect />
        </div>
        <h1 className="text-blackTextColor text-lg">
          Browse <b>1000</b> results for "nike"
        </h1>
        <ChosenCategoryList />
      </div>
    </div>
  );
};

export default SearchedContent;
