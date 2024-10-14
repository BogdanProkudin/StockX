import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { arrHeaderMainLinks } from "../../assets/SecondHeader/HeaderDropDownLinks";

const NavigationHeader = () => {
  const [isDropDownMenuVisible, setIsDropDownMenuVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

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

  const handleStart = () => {
    setIsActive(true); // Активируем таймер показа
  };

  const handleStop = () => {
    setIsActive(false); // Активируем таймер скрытия
  };

  return (
    <header className={styles.nav_header}>
      <div className={styles.wrapper_nav_header}>
        <ul>
          {arrHeaderMainLinks.map((obj) => (
            <>
              <li
                onMouseEnter={handleStart}
                onMouseLeave={handleStop}
                key={obj.name}
                className={styles.navheader_links}
              >
                <Link to={obj.path}>{obj.name}</Link>
                <div className={styles.header_navigation_item_line}></div>
              </li>
              <li
                className={`${styles.sub_navigation} ${
                  isDropDownMenuVisible ? styles.active : ""
                }`}
              >
                <div className={styles.dropdown_navigate_block}></div>
              </li>
            </>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavigationHeader;
