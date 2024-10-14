import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import {
  arrHeaderMainLinks,
  brandsData,
} from "../../assets/SecondHeader/HeaderDropDownLinks";
import Dropdown from "./Dropdown/Dropdown";

const NavigationHeader = () => {
  const [isDropDownMenuVisible, setIsDropDownMenuVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLinkName, setIsLinkName] = useState("");

  useEffect(() => {
    let showTimer: any;
    let hideTimer: any;

    if (isActive) {
      clearTimeout(hideTimer);

      //  для показа dropdown
      showTimer = setTimeout(() => {
        setIsDropDownMenuVisible(true);
      }, 600);
    } else {
      // Очищаем таймер показа, если есть
      clearTimeout(showTimer);
      setIsLinkName("");
      // Запускаем таймер для скрытия dropdown
      hideTimer = setTimeout(() => {
        setIsDropDownMenuVisible(false);
      }, 600);
    }

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isActive]);

  const handleStart = (name: string) => {
    setIsActive(true); // Активируем таймер показа
    setIsLinkName(name);
  };

  const handleStop = () => {
    setIsActive(false); // Активируем таймер скрытия
  };
  const isOpen = () => {
    setIsActive(true);
  };
  const isClose = () => {
    setIsActive(false);
  };

  return (
    <header className={styles.nav_header}>
      <div className={styles.wrapper_nav_header}>
        <ul className={styles.flex_nav_header}>
          {arrHeaderMainLinks.map((obj) => (
            <>
              <li
                onMouseEnter={() => handleStart(obj.name)}
                onMouseLeave={handleStop}
                key={obj.name}
                className={styles.navheader_links}
              >
                {" "}
                <Link to={obj.path}>{obj.name}</Link>
                <div
                  className={`${styles.header_navigation_item_line} ${
                    isLinkName === obj.name ? styles.active : ""
                  }`}
                ></div>
              </li>
              <li
                onMouseEnter={isOpen}
                onMouseLeave={isClose}
                className={`${styles.sub_navigation} ${
                  isDropDownMenuVisible ? styles.active : ""
                }`}
              >
                <Dropdown
                  subLinkName={isLinkName}
                  content={obj.name === isLinkName ? obj.content : null}
                />
              </li>
            </>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavigationHeader;
