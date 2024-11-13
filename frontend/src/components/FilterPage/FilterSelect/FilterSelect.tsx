import { CheckIcon } from "lucide-react";
import { useState } from "react";
import Select, { ActionMeta, GroupBase, StylesConfig } from "react-select";
import Control from "./FilterControl";
import Option from "./FilterOptions";

const customStyles: StylesConfig<
  FilterOption,
  false,
  GroupBase<FilterOption>
> = {
  container: (base) => ({
    ...base,
    maxWidth: "250px",
    marginBottom: "1rem",
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: "white",
    borderRadius: "1rem",
    borderColor: state.isFocused ? "#007bff" : "#ccc",
    paddingLeft: "12px",
    cursor: "pointer",
    boxShadow: state.isFocused ? "0 0 0 1px #007bff" : undefined,
    "&:hover": { borderColor: "#007bff" },
  }),
  singleValue: (base) => ({
    ...base,
    color: "black",
    fontSize: "14px",
    paddingRight: "5px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "black",
    fontSize: "14px",
    paddingRight: "5px",
  }),
  option: (base) => ({
    ...base,
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    fontSize: "15px",
    color: "black",
    cursor: "pointer",
    "&:hover": { backgroundColor: "#CFCFCF" },
  }),
};

interface FilterOption {
  label: string;
  value: string;
}

const FilterSelect = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>({
    label: "Most Popular",
    value: "1",
  });

  const handleSelectFilter = (
    newValue: FilterOption | null,
    actionMeta: ActionMeta<FilterOption>,
  ) => {
    if (newValue) {
      setSelectedFilter(newValue);
      console.log(newValue.label);
    }
  };

  const options: FilterOption[] = [
    { value: "apple", label: "Featured" },
    { value: "1", label: "Most Popular" },
    { value: "2", label: "New Lowest Asks" },
    { value: "3", label: "New Highest Bids" },
    { value: "4", label: "Average Sale Price" },
    { value: "5", label: "Total Sold" },
    { value: "6", label: "Last Sale" },
  ];

  return (
    <Select<FilterOption, false>
      onChange={handleSelectFilter}
      value={selectedFilter}
      components={{ Control, Option }}
      options={options}
      isSearchable={false}
      styles={customStyles}
      placeholder="Most Popular"
    />
  );
};

export default FilterSelect;
