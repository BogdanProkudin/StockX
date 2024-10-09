import React from "react";
import styles from "./styles.module.scss";
import PopUp from "../PopUp/index";
import { Link } from "react-router-dom";
import {
  navLinksArr,
  profileArr,
} from "../../../assets/HeaderAssets/HeaderUserAction";
const HeaderUser: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      {navLinksArr.map((obj, id) => (
        <li key={id}>
          <Link to={obj.path}>{obj.img}</Link>
          <div className={styles.dropdown}>
            <PopUp objectArr={obj.path === "/profile" ? profileArr : null} />
          </div>
        </li>
      ))}
    </div>
  );
};

export default HeaderUser;
