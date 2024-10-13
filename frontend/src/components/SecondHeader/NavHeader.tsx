import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { arrHeaderMainLinks } from "../../assets/SecondHeader/HeaderDropDownLinks";

const NavigationHeader = () => {
  const [isDropDownMenuVisible, setIsDropDownMenuVisible] = useState(false); // Видимость выпадающего меню
  const [currentHovered, setCurrentHovered] = useState<string | null>(null); // Текущий активный элемент
  const [openTimer, setOpenTimer] = useState<any>(null); // Таймер для открытия меню
  const [closeTimer, setCloseTimer] = useState<any>(null); // Таймер для закрытия меню

  useEffect(() => {
    // Очистка таймеров при размонтировании компонента
    return () => {
      if (openTimer) clearTimeout(openTimer);
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [openTimer, closeTimer]);

  const handleMouseEnter = (itemName: string) => {
    // Очищаем таймер закрытия при наведении на новый элемент
    if (closeTimer) {
      clearTimeout(closeTimer);
      setCloseTimer(null);
    }

    // Если элемент другой и меню не открыто, запускаем таймер для открытия
    if (currentHovered !== itemName) {
      if (openTimer) {
        clearTimeout(openTimer); // Очищаем предыдущий таймер открытия
      }

      const timerId = setTimeout(() => {
        console.log(`открыли меню для ${itemName}`);
        setIsDropDownMenuVisible(true);
        setCurrentHovered(itemName); // Устанавливаем текущий активный элемент
      }, 600);
      setOpenTimer(timerId);
    }
  };

  const handleMouseLeave = (itemName: string) => {
    // Очищаем таймер открытия при покидании элемента
    if (openTimer) {
      clearTimeout(openTimer);
      setOpenTimer(null);
    }

    // Запускаем таймер для закрытия, если покидаем активный элемент
    if (currentHovered === itemName) {
      const timerId = setTimeout(() => {
        console.log(`закрыли меню для ${itemName}`);
        setIsDropDownMenuVisible(false);
        setCurrentHovered(null); // Сбрасываем текущий активный элемент
      }, 595);
      setCloseTimer(timerId);
    }
  };

  return (
    <header className={styles.nav_header}>
      <div className={styles.wrapper_nav_header}>
        <ul>
          {arrHeaderMainLinks.map((obj) => (
            <React.Fragment key={obj.name}>
              <li
                onMouseEnter={() => handleMouseEnter(obj.name)}
                onMouseLeave={() => handleMouseLeave(obj.name)}
                className={styles.navheader_links}
              >
                <Link to={obj.path}>{obj.name}</Link>
                <div className={styles.header_navigation_item_line}></div>
              </li>
              <li
                className={`${styles.sub_navigation} ${
                  isDropDownMenuVisible && currentHovered === obj.name
                    ? styles.active
                    : ""
                }`}
              >
                <div className={styles.dropdown_navigate_block}></div>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavigationHeader;
