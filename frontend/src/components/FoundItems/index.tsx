import SearchedItemsList from "./SearchedItems/SearchedItemsList";
import SuggestionItemsList from "./SuggestionItems/SuggestionItemsList";

const index = () => {
  return (
    <div className=" flex justify-center flex-col items-center  min-w-[965px] h-full">
      <SuggestionItemsList />
      <SearchedItemsList />
    </div>
  );
};

export default index;
