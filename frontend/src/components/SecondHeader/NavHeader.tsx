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
  const num = 5;
  console.log(num);

  return (
    <header className={styles.nav_header}>
      <div className={styles.wrapper_nav_header}>
        <ul>
          {arrHeaderMainLinks.map((obj, index) => (
            <li key={obj.name} className={styles.navheader_links}>
              <Link to={obj.path}>{obj.name}</Link>
              <div
                ref={headerLinkRefs[index]}
                className={styles.header_navigation_item_line}
              ></div>
              {isAnimated && (
                <div className={styles.dropdown_navigate_block}>Info</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavigationHeader;
