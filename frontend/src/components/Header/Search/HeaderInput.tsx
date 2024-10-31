import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import debounce from "lodash.debounce";
import { useLazySearchItemsQuery } from "../../../redux/api/mainApiSlice";

const HeaderInput: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedVSearchValue, setDebouncedVSearchValue] = React.useState("");

  const onClickRemove = () => {
    setSearchValue("");
  };
  const [fetchItems, { data, isLoading }] = useLazySearchItemsQuery();

  const handleSearch = React.useCallback(
    debounce(async (query) => {
      if (query.length > 0) {
        await fetchItems(query);
      }
    }, 500), // задержка в миллисекундах
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    handleSearch(e.target.value);
  };
  const userToken = localStorage.getItem("token");
  useEffect(() => {
    console.log("IS LOADING", isLoading, "DATA", data);
  }, [data]);

  return (
    <div
      className={`${styles.header_input_container} ${
        userToken ? styles.active : ""
      }`}
    >
      <button className={styles.search}>
        <SearchIcon />
      </button>
      <input
        onChange={onChangeInput}
        className={styles.header_input}
        placeholder="Search for brand, color, etc."
        type="text"
        value={searchValue}
      />
      {searchValue.length > 0 && (
        <button onClick={onClickRemove} className={styles.close}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default HeaderInput;
