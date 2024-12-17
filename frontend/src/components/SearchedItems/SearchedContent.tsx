import { useSearchParams } from "react-router-dom";
import { useLazySearchItemsQuery } from "../../redux/api/mainApiSlice";
import { SearchResponse, SearchParams } from "../../types/searchTypes";
import ChosenCategoryList from "./ChosenCategory/ChosenCategoryList";
import FilterBreadCrumb from "./BreadCramb/BreadCrumb";
import FilterSelect from "./FilterSelect/FilterSelect";
import SearchedItemsList from "./SearchedItemsList/SearchedItemsList";
import CategoryList from "./SideBar/CategoryList/CategoryList";
import { useEffect, useMemo } from "react";
import BrandsList from "./SideBar/BrandsList/BrandsList";
import GenderList from "./SideBar/GenderList/GenderList";
import TrendingButton from "./SideBar/Trending/TrendingButton";
import ColorItem from "./SideBar/ColorList/ColorItem";
import ColorList from "./SideBar/ColorList/ColorList";

const SearchedContent = () => {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("s") ?? "";
  const categoryQuery = searchParams.get("category") || "";
  const brandQuery = searchParams.get("brand") || "";
  const page = Number(searchParams.get("page")) || 1;
  const genderQuery = searchParams.get("gender") || "";
  const trendingQuery = searchParams.get("trending") || "";
  const colorQuery = searchParams.get("color") || "";
  const [fetchData, { data, isLoading, error }] = useLazySearchItemsQuery();

  // Мемоизируем параметры поиска
  const searchParameters = useMemo(
    () => ({
      searchingValue: searchQuery,
      categoryQuery: categoryQuery,
      brandQuery: brandQuery,
      genderQuery: genderQuery,
      trendingQuery: trendingQuery,
      colorQuery: colorQuery,
    }),
    [searchParams],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(searchParameters, true);
  }, [searchParameters, fetchData]);

  if (error) {
    return (
      <div className="mt-3 flex justify-center text-red-500">
        Error loading items. Please try again later.
      </div>
    );
  }

  return (
    <div className="mx-auto mt-3 flex h-full w-full max-w-[1240px] items-start justify-between px-4">
      <div className="mt-2 h-full w-[300px]">
        <TrendingButton />
        <CategoryList />
        <BrandsList />
        <GenderList />
        <ColorList />
      </div>
      <div className="h-full min-h-[500px] w-full max-w-[927px] p-2">
        <div className="flex h-10 justify-between">
          <FilterBreadCrumb isLoading={isLoading} />
          <FilterSelect isLoading={isLoading} />
        </div>

        <h1 className="text-lg text-blackTextColor">
          {searchQuery &&
            `Browse ${isLoading ? "..." : data?.total || 0} results for ${searchQuery}`}
        </h1>

        <div className="flex flex-col">
          <ChosenCategoryList isLoading={isLoading} />
          <SearchedItemsList
            items={data?.data}
            isLoading={isLoading}
            total={data?.total || 0}
            currentPage={page}
            totalPages={data?.totalPages || 1}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchedContent;
