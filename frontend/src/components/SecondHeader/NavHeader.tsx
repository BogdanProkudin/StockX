import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
const NavigationHeader = () => {
  const arrLinks: { name: string; path: string }[] = [
    { name: "Brands", path: "" },
    { name: "Deals", path: "" },
    { name: "New", path: "" },
    { name: "Men", path: "" },
    { name: "Women", path: "" },
    { name: "Kids", path: "" },
    { name: "Sneakers", path: "" },
    { name: "Shoes", path: "" },
    { name: "Apparel", path: "" },
    { name: "Accessories", path: "" },
    { name: "More Categories", path: "" },
  ];

  const headerLinkRefs = arrLinks.map(() => React.createRef<HTMLDivElement>());
  useEffect(() => {
    // Пример работы с массивом ref
    headerLinkRefs.forEach((ref) => {
      const element = ref.current;
      if (element) {
        element.addEventListener("transitionend", () => {
          console.log("ANIMATION FINISHED for", element);
        });
      }
    });
  }, [headerLinkRefs]);

  return (
    <header className={styles.nav_header}>
      <div className={styles.wrapper_nav_header}>
        <ul>
          {arrLinks.map((obj, index) => (
            <li key={obj.name} className={styles.navheader_links}>
              <Link to={obj.path}>{obj.name}</Link>
              <div
                ref={headerLinkRefs[index]}
                className={styles.header_navigation_item_line}
              ></div>
              <div className={styles.dropdown_navigate_block}></div>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavigationHeader;
