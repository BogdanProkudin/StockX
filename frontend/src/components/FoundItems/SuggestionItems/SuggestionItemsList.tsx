import SuggestionItem from "./SuggestionItem";

const SuggestionItemsList = () => {
  const suggestionNames = ["sneakers", "apparel", "accessories", "shoes"];
  return (
    <div className=" flex  flex-col w-full h-96">
      {suggestionNames.map((name) => {
        return <SuggestionItem name={name} />;
      })}
    </div>
  );
};

export default SuggestionItemsList;
