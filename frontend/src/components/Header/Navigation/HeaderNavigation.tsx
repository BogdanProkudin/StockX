import React from "react";
import styles from "./styles.module.scss";

import { Link } from "react-router-dom";
const HeaderNavigation: React.FC = () => {
  const arrLinks: { name: string; path: string }[] = [
    {
      name: "News",
      path: "/News",
    },
    {
      name: "About",
      path: "/About",
    },
    {
      name: "Help",
      path: "/Help",
    },
    {
      name: "Sell",
      path: "/Sell",
    },
  ];
  return (
    <div className={styles.header_nav_links}>
      <nav>
        {arrLinks.map((obj) => (
          <Link key={obj.path} to={obj.path}>
            {obj.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default HeaderNavigation;
