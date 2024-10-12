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

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
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

  const OnMouseHover = (name: string) => {
    setIsSubLink(name);
  };
  return (
    <header className={styles.nav_header}>
      <div className={styles.wrapper_nav_header}>
        <ul>
          {arrHeaderMainLinks.map((obj, index) => (
            <React.Fragment key={obj.name}>
              <li
                onMouseEnter={() => OnMouseHover(obj.name)}
                onMouseLeave={handleMouseLeave}
                className={styles.navheader_links}
              >
                <Link to={obj.path}>{obj.name}</Link>
                <div className={styles.dropdown_menu}>
                  {isSubLink === "Brands"
                    ? brands.map((obj) => <li>{obj.name}</li>)
                    : ""}
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

{
  /* <li
className={`${styles.sub_navigation} ${
  isDropDownMenuVisible ? styles.active : ""
}`}
></li> */
}
{
  /* <div className={styles.sub_navigation_wrapper}>
{isSubLink == "Brands"
  ? brands.map((obj) => (
      <li>
        <Link to={obj.path}>{obj.name}</Link>
      </li>
    ))
  : null}
</div> */
}
{
  /* <div
                  ref={headerLinesRefs.current[index]}
                  className={styles.header_navigation_item_line}
                ></div> */
}
