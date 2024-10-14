import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { arrHeaderMainLinks } from "../../assets/SecondHeader/HeaderDropDownLinks";

const NavigationHeader = () => {
  const headerLinesRefs = useRef(
    arrHeaderMainLinks.map(() => React.createRef<HTMLDivElement>())
  );
  const [name, setName] = useState<any>({});
  const [isDropDownMenuVisible, SetIsDropDownMenuVisible] = useState(false);
  const [lineAnimationActive, setLineAnimationActive] = useState(false);
  const hoverTimeout = useRef<any | null>(null);

  const handleMouseEnter = (name: string, content: string | undefined) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    hoverTimeout.current = setTimeout(() => {
      console.log("NAME", name);
      setLineAnimationActive(true);
    }, 600);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
  };

  useEffect(() => {
    if (lineAnimationActive) {
      console.log("показать");
      SetIsDropDownMenuVisible(true);
    } else {
      hoverTimeout.current = setTimeout(() => {
        SetIsDropDownMenuVisible(false);
        setName({});
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
                onMouseEnter={() => handleMouseEnter(obj.name, obj.content)}
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
