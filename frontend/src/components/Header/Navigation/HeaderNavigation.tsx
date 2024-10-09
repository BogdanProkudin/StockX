import React from "react";
import styles from "./styles.module.scss";
import PopUp from "../PopUp/index";
import { Link } from "react-router-dom";
import {
  arrLinks,
  aboutArr,
  sellArr,
} from "../../../assets/HeaderAssets/HeaderNavigation";

const HeaderNavigation: React.FC = () => {
  const [navigate, setNavigate] = React.useState<string | null>(null);
  const isFocus = (name: string) => {
    if (name === "About" || name === "Sell") {
      setNavigate(name);
    } else {
      setNavigate(null);
    }
  };

  return (
    <div className={styles.header_navigation_links_container}>
      <nav>
        {arrLinks.map((obj) => (
          <li
            className={styles.header_navigation_item}
            onMouseEnter={() => isFocus(obj.name)}
            key={obj.path}
          >
            <Link to={obj.path}>{obj.name}</Link>
            <div className={styles.dropdown}>
              <PopUp
                objectArr={
                  navigate === "About"
                    ? aboutArr
                    : navigate === "Sell"
                    ? sellArr
                    : null
                }
              />
            </div>
          </li>
        ))}
      </nav>
    </div>
  );
};

export default HeaderNavigation;
