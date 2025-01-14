import SearchIcon from "@mui/icons-material/Search";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useSearch } from "../../../hooks/useSearch";
import { useAppDispatch } from "../../../redux/hook";
import CloseIcon from "@mui/icons-material/Close";
import {
  setIsSearching,
  setSelectedBrand,
  setSelectedSubCategory,
  setSelectedGender,
  setSelectedColor,
  setCategoryNames,
  setIsLoading,
  setSearchValue,
  setFoundedItems,
} from "../../../redux/slices/searchSlice";
import { useNavigate } from "react-router-dom";
const HeaderSmallScreenInput = () => {
  const { searchValue, handleSearch, data, isError } = useSearch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter" && searchValue.length > 0) {
      navigate(`/search?s=${searchValue}`);
      dispatch(setIsSearching(false));
      dispatch(setSelectedBrand(""));
      dispatch(setSelectedSubCategory(""));
      dispatch(setSelectedGender(""));
      dispatch(setSelectedColor(""));
      handleSearch({ query: "", isSearching: false });
      dispatch(setCategoryNames(["Clear All", `Search: "${searchValue}"`]));
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setIsSearching(true));
    dispatch(setIsLoading(true));
    dispatch(setSearchValue(value));

    handleSearch({ query: value, isSearching: true });
    if (value.length === 0) {
      dispatch(setIsSearching(false));
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

  return (
    <div className={styles.header_small_screen_input_container}>
      <button className={styles.search}>
        <SearchIcon />
      </button>
      <input
        onChange={onChangeInput}
        onKeyDown={handleKeyDown}
        type="text"
        className={styles.header_small_screen_input}
        placeholder="Search"
      />
    </div>
  );
};
export default HeaderSmallScreenInput;
