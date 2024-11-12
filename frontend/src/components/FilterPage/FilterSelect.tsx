import Select, { components } from "react-select";

// Кастомные стили
const customStyles = {
  container: (provided: any) => ({
    ...provided,
    maxWidth: "210px",
    width: "auto",
    padding: "0px",
    marginBottom: "1rem",
  }),
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    backgroundColor: "white",
    borderRadius: "1rem",
    borderColor: state.isFocused ? "#007bff" : "#ccc",
    padding: "0px",
    paddingLeft: "12px",
    width: "auto",
    boxShadow: state.isFocused ? "0 0 0 1px #007bff" : null,
    "&:hover": { borderColor: "#007bff" },
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "0px",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "black",
    fontSize: "14px",
    minWidth: "50px",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "black",
    width: "100%",
    fontSize: "14px",
    padding: "0px",
  }),
};

const Control = ({ children, ...props }: any) => (
  <components.Control {...props}>
    <span className="text-sm">Sort:</span> {children}{" "}
  </components.Control>
);

const FilterSelect = () => {
  const options = [
    { value: "apple", label: "Featured" },
    { value: "banana", label: "Most Popular" },
    { value: "banana", label: "New Lowest Asks" },
    { value: "banana", label: "New Highest Bids" },
    { value: "banana", label: "Average Sale Price" },
    { value: "banana", label: "Total Sold" },
    { value: "banana", label: "Last Sale" },
  ];

  return (
    <Select
      styles={customStyles}
      components={{ Control }}
      options={options}
      isSearchable={false}
      placeholder="Most Popular"
    />
  );
};

export default FilterSelect;
