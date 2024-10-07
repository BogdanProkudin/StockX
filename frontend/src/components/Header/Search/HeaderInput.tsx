import React from "react";
import styles from "./styles.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
const HeaderInput: React.FC = () => {
  const [isValue, setIsValue] = React.useState("");
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValue(e.target.value);
  };
  const onClickRemove = () => {
    setIsValue("");
  };
  return (
    <div className={styles.root}>
      <button className={styles.search}>
        <SearchIcon />
      </button>
      <input
        onChange={onChangeInput}
        className={styles.header_input}
        placeholder="Search for brand, color, etc."
        type="text"
        value={isValue}
      />
      {isValue.length > 0 && (
        <button onClick={onClickRemove} className={styles.close}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default HeaderInput;
