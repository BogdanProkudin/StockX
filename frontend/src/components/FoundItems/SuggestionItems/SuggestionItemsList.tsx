import SuggestionItem from "./SuggestionItem";

const SuggestionItemsList = () => {
  const suggestionNames = ["sneakers", "apparel", "accessories", "shoes"];
  return (
    <div className="flex w-full flex-col">
      {suggestionNames.map((name) => {
        return (
          <div
            key={name}
            className="flex h-14 w-full cursor-pointer items-center justify-between border-b-2 border-b-lightGray p-4 transition-all duration-100 hover:border-r-[10px] hover:border-r-green-900"
          >
            <SuggestionItem name={name} />
          </div>
        );
      })}
    </div>
  );
};

export default SuggestionItemsList;
