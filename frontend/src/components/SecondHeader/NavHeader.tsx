import React from "react";
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
  const headerLinkRef = React.useRef<HTMLLIElement>(null);
  React.useEffect(() => {
    const liElement = headerLinkRef.current;

    if (liElement) {
      const computedStyle = window.getComputedStyle(liElement, "::before");
      const beforeWidth = computedStyle.getPropertyValue("width");
      console.log("Ширина ::before элемента:", beforeWidth);
    }
  }, [headerLinkRef]);
  return (
    <header className={styles.nav_header}>
      <div className={styles.wrapper_nav_header}>
        <ul>
          {arrLinks.map((obj) => (
            <li
              ref={headerLinkRef}
              key={obj.name}
              className={styles.navheader_links}
            >
              <Link to={obj.path}>{obj.name}</Link>
              <div className={styles.dropdown_navigate_block}></div>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavigationHeader;
