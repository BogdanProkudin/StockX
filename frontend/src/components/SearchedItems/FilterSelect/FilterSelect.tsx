import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Select, { ActionMeta, GroupBase, StylesConfig } from "react-select";
import Control from "./FilterControl";
import Option from "./FilterOptions";
import { useNavigate, useSearchParams } from "react-router-dom";

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
    backgroundColor: "#EDEDED",
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>({
    label: "Featured",
    value: "1",
  });

  useEffect(() => {
    const sortQuery = searchParams.get("sort");
    setSelectedFilter({
      label: sortQuery ? sortQuery : "Featured",
      value: "1",
    });
  }, []);

  const handleSelectFilter = (newValue: FilterOption | null) => {
    if (newValue) {
      searchParams.set("sort", newValue.value);
      setSearchParams(searchParams);

      setSelectedFilter(newValue);
    }
  };

  const sortOptions = [
    { value: "default", label: "Featured" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
    { value: "releaseDate", label: "Release Date" },
    { value: "availability", label: "Availability" },
    { value: "alphabetical", label: "Alphabetical" },
  ];

  return (
    <Select<FilterOption, false>
      onChange={handleSelectFilter}
      value={selectedFilter}
      components={{ Control, Option }}
      options={sortOptions}
      isSearchable={false}
      styles={customStyles}
      placeholder="Featured"
    />
  );
};

export default FilterSelect;
