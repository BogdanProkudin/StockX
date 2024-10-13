import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import {
  arrHeaderMainLinks,
  brands,
} from "../../assets/SecondHeader/HeaderDropDownLinks";

const NavigationHeader = () => {
  // const headerLinesRefs = useRef(
  //   arrHeaderMainLinks.map(() => React.createRef<HTMLDivElement>())
  // );
  const [isDropDownMenuVisible, SetIsDropDownMenuVisible] = useState(false);
  const [lineAnimationActive, setLineAnimationActive] = useState(false);
  const [isSubLink, setIsSubLink] = React.useState("");
  const hoverTimeout = useRef<any | null>(null);

  const handleMouseEnter = (name: string) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setIsSubLink(name);
    hoverTimeout.current = setTimeout(() => {
      setLineAnimationActive(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setLineAnimationActive(false);
    }, 290);
  };

  useEffect(() => {
    if (lineAnimationActive) {
      console.log("показать");
      SetIsDropDownMenuVisible(true);
    } else {
      hoverTimeout.current = setTimeout(() => {
        SetIsDropDownMenuVisible(false);
        console.log("скрыть");
      }, 0);
    }
  }, [lineAnimationActive]);

  const OnMouseHover = () => {
    setLineAnimationActive(true);
  };
  const setMouseHover = () => {
    setLineAnimationActive(false);
  };
  return (
    <header className={styles.nav_header}>
      <div className={styles.wrapper_nav_header}>
        <ul>
          {arrHeaderMainLinks.map((obj, index) => (
            <React.Fragment key={obj.name}>
              <li
                onMouseEnter={() => handleMouseEnter(obj.name)}
                onMouseLeave={handleMouseLeave}
                className={styles.navheader_links}
              >
                <Link to={obj.path}>{obj.name}</Link>
              </li>

              <li
                onMouseEnter={OnMouseHover}
                onMouseLeave={setMouseHover}
                className={`${styles.sub_navigation} ${
                  isDropDownMenuVisible ? styles.active : ""
                }`}
              >
                <div className={styles.sub_navigation_wrapper}>
                  {isSubLink == "Brands"
                    ? brands.map((obj) => (
                        <li>
                          <Link to={obj.path}>{obj.name}</Link>
                        </li>
                      ))
                    : null}
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavigationHeader;
