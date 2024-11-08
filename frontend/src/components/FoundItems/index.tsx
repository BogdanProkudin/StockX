import { useAppSelector } from "../../redux/hook";
import SearchedItemsList from "./SearchedItems/SearchedItemsList";
import SearchedItemsListSkeleton from "./Skeletons/SearchedItemsListSkeleton";
import SuggestionItemsList from "./SuggestionItems/SuggestionItemsList";

const index = () => {
  const isLoading = useAppSelector((state) => state.searchSlice.isLoading);
  const foundeditems = useAppSelector(
    (state) => state.searchSlice.foundedItems,
  );
  const suggestionCountsArr = useAppSelector(
    (state) => state.searchSlice.suggestionCountsArr,
  );

  if (isLoading) {
    return <SearchedItemsListSkeleton />;
  }

  if (foundeditems && foundeditems.length > 0) {
    return (
      <div className="h-100 flex min-w-[965px] flex-col justify-center">
        <SuggestionItemsList suggestionCountsArr={suggestionCountsArr} />
        <SearchedItemsList />
      </div>
    );
  }

  return (
    <div className="flex h-full min-w-[965px] justify-center">
      <p>NOTHING WAS FOUND</p>
    </div>
  );
};

export default index;
