import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { arrHeaderMainLinks } from "../../assets/SecondHeader/HeaderDropDownLinks";

const NavigationHeader = () => {
  const headerLinesRefs = useRef(
    arrHeaderMainLinks.map(() => React.createRef<HTMLDivElement>())
  );
  const [isDropDownMenuVisible, SetIsDropDownMenuVisible] = useState(false);
  const [lineAnimationActive, setLineAnimationActive] = useState(false);
  const hoverTimeout = useRef<any | null>(null);

  const handleMouseEnter = () => {
    // Устанавливаем тайм аут на 0.6 секунды как в css анимации
    hoverTimeout.current = setTimeout(() => {
      setLineAnimationActive(true);
    }, 600);
  };

  const handleMouseLeave = () => {
    // Если курсор был убран раньше 1 секунды, отменяем timeout
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setLineAnimationActive(false);
  };

  useEffect(() => {
    // маф это логика открытия закрытия dropdown menu

    if (lineAnimationActive) {
      console.log("показать");
      SetIsDropDownMenuVisible(true);
    } else {
      // вот тут 590 сек что бы сначало закрывалось dropdown меню, а не сработал таймер открытия и потом сразу закрытия, который был запущен с предыдущего раза
      setTimeout(() => {
        SetIsDropDownMenuVisible(false);
        console.log("скрыть");
      }, 590);
    }
  }, [lineAnimationActive]);
  return (
    <header className={styles.nav_header}>
      <div className={styles.wrapper_nav_header}>
        <ul>
          {arrHeaderMainLinks.map((obj, index) => (
            <>
              <li
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={obj.name}
                className={styles.navheader_links}
              >
                <Link to={obj.path}>{obj.name}</Link>
                <div
                  ref={headerLinesRefs.current[index]}
                  className={styles.header_navigation_item_line}
                ></div>
              </li>
              <li
                className={`${styles.sub_navigation} ${
                  isDropDownMenuVisible ? styles.active : ""
                }`}
              >
                <div className={styles.dropdown_navigate_block}>Info</div>
              </li>
            </>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavigationHeader;
