import { useAppSelector } from "../../redux/hook";
import SearchedItemsList from "./SearchedItems/SearchedItemsList";
import SearchedItemsListSkeleton from "./Skeletons/SearchedItemsListSkeleton";
import SuggestionItemsList from "./SuggestionItems/SuggestionItemsList";
import { MESSAGES } from "./constants";

import { ErrorBoundary } from "react-error-boundary";
import { motion } from "framer-motion";
import { SearchState } from "../../@types/foundPageTypes";

const ErrorFallback = () => (
  <div role="alert" className="flex h-full justify-center text-red-500">
    {MESSAGES.LOAD_ERROR}
  </div>
);

const Index = () => {
  const { isLoading, foundedItems, suggestionCountsArr } =
    useAppSelector<SearchState>((state) => state.searchSlice);

  if (isLoading) {
    return <SearchedItemsListSkeleton />;
  }

  if (foundedItems && foundedItems.length > 0) {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <motion.div
          className="h-100 flex flex-col justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <SuggestionItemsList suggestionCountsArr={suggestionCountsArr} />
          <SearchedItemsList />
        </motion.div>
      </ErrorBoundary>
    );
  }

  return (
    <motion.div
      className="flex h-full items-center justify-center text-gray-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-label="No results found"
    >
      {MESSAGES.NOTHING_FOUND}
    </motion.div>
  );
};

export default Index;
