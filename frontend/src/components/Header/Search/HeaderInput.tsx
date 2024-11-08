import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  setFoundedItems,
  setIsLoading,
  setSearchValue,
} from "../../../redux/slices/searchSlice";
import { useSearch } from "../../../hooks/useSearch";
import { useNavigate } from "react-router-dom";

const HeaderInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchValue, handleSearch, data, isError } = useSearch();

  const userToken = localStorage.getItem("token");
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      navigate(`/search/${searchValue}`);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    dispatch(setIsLoading(true));
    dispatch(setSearchValue(value));
    handleSearch(value);
    if (value.length === 0) {
      dispatch(setFoundedItems([]));
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setFoundedItems(data));
      window.scrollTo(0, 0);
    }
    if (isError) {
      console.error("Error fetching items :<");
    }
  }, [data, isError]);

  const onClickRemove = () => {
    dispatch(setSearchValue(""));
    dispatch(setFoundedItems([]));
    window.scrollTo(0, 0);
  };

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
        onKeyDown={handleKeyDown}
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
