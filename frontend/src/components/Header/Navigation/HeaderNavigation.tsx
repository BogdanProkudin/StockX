import React from "react";
import styles from "./styles.module.scss";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
const HeaderNavigation = () => {
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
      <button className={styles.bellBtn}>
        <NotificationsIcon />
      </button>
    </div>
  );
};

export default HeaderNavigation;
