import { useMemo } from "react";
import SuggestionItem from "./SuggestionItem";
import { motion } from "framer-motion";
import { createSuggestionNames } from "../../../assets/SearchAssets/SuggestionItemsNames";
import styles from "./SuggestionItems.module.css";
import { ISuggestionItem } from "../../../@types/foundPageTypes";

interface SuggestionItemsListProps {
  suggestionCountsArr: number[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

const SuggestionItemsList: React.FC<SuggestionItemsListProps> = ({
  suggestionCountsArr,
}) => {
  const suggestionNames = useMemo<ISuggestionItem[]>(
    () => createSuggestionNames(suggestionCountsArr),
    [suggestionCountsArr],
  );

  return (
    <motion.div
      className={styles.container}
      variants={container}
      initial="hidden"
      animate="show"
      role="list"
      aria-label="Suggestion categories"
    >
      {suggestionNames.map((suggest) => (
        <motion.div
          key={suggest.name}
          className={styles.item}
          variants={item}
          role="listitem"
        >
          <SuggestionItem name={suggest.name} count={suggest.count} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SuggestionItemsList;
