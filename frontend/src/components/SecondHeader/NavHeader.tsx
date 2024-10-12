import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { arrHeaderMainLinks } from "../../assets/SecondHeader/HeaderDropDownLinks";
const NavigationHeader = () => {
  const headerLinkRefs = arrHeaderMainLinks.map(() =>
    React.createRef<HTMLDivElement>()
  );

  const [isAnimated, setIsAnimated] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState<number>(0);
  const [isNameLink, setIsNameLink] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    headerLinkRefs.forEach((ref) => {
      const element = ref.current;

      if (element) {
        const width = element.offsetWidth;
        console.log("width:", width);
        if (width > maxWidth) {
          setMaxWidth(width);
        }

        element.addEventListener("transitionend", () => {
          const currentWidth = element.offsetWidth;
          console.log("currentWidth:", currentWidth);

          if (currentWidth == maxWidth) {
            setIsAnimated(false);
            setIsVisible(false);
          } else {
            setIsAnimated(true);
            setIsVisible(true);
          }
        });
      }
    });
  }, [maxWidth]);
  const onMouseHover = (title: string) => {
    setIsNameLink(title);
  };

  return (
    <header className={styles.nav_header}>
      <div className={styles.wrapper_nav_header}>
        <ul>
          {arrHeaderMainLinks.map((obj, index) => (
            <>
              <li
                onMouseEnter={() => onMouseHover(obj.name)}
                key={obj.name}
                className={styles.navheader_links}
              >
                <Link to={obj.path}>{obj.name}</Link>
                <div
                  ref={headerLinkRefs[index]}
                  className={styles.header_navigation_item_line}
                ></div>
              </li>
              <li
                className={`${styles.sub_navigation} ${
                  isVisible ? styles.active : ""
                }`}
              >
                {isAnimated && isNameLink == obj.name && (
                  <div className={styles.dropdown_navigate_block}>Info</div>
                )}
              </li>
            </>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavigationHeader;
