import SearchIcon from "@mui/icons-material/Search";
import styles from "./styles.module.scss";
const HeaderSmallScreenInput = () => {
  return (
    <div className={styles.header_small_screen_input_container}>
      <button className={styles.search}>
        <SearchIcon />
      </button>
      <input
        type="text"
        className={styles.header_small_screen_input}
        placeholder="Search"
      />
    </div>
  );
};
export default HeaderSmallScreenInput;
