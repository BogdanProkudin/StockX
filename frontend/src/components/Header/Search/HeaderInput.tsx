import React from "react";
import styles from "./styles.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import debounce from "lodash.debounce";

const HeaderInput: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedVSearchValue, setDebouncedVSearchValue] = React.useState("");

  const onClickRemove = () => {
    setSearchValue("");
  };
  const debouncedChangeHandler = React.useCallback(
    debounce((value) => {
      console.log("DEBOUNCE search VALue", value);

      setDebouncedVSearchValue(value);
    }, 300),
    []
  );
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    debouncedChangeHandler(e.target.value);
  };
  const userToken = localStorage.getItem("token");
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
