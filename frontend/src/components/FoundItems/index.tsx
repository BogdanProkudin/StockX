import { useAppSelector } from "../../redux/hook";
import SearchedItemsList from "./SearchedItems/SearchedItemsList";
import SuggestionItemsList from "./SuggestionItems/SuggestionItemsList";

const index = () => {
  const isLoading = useAppSelector((state) => state.searchSlice.isLoading);
  console.log("IS WWW ", isLoading);

  return (
    <div className="flex h-full min-w-[965px] flex-col items-center justify-center">
      {isLoading ? (
        <div>LOADING</div>
      ) : (
        <>
          <SuggestionItemsList />
          <SearchedItemsList />
        </>
      )}
    </div>
  );
};

export default index;
