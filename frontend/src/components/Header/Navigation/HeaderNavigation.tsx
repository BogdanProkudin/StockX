import React from "react";
import styles from "./styles.module.scss";
import PopUp from "../PopUp/index";
import { Link } from "react-router-dom";
const HeaderNavigation: React.FC = () => {
  const [navigate, setNavigate] = React.useState<string | null>(null);
  const isFocus = (name: string) => {
    if (name === "About" || name === "Sell") {
      setNavigate(name);
    } else {
      setNavigate(null);
    }
  };

  const aboutArr: { img: string; name: string; path: string }[] = [
    { img: "icon_profile.png", name: "How StockX Works", path: "" },
    { img: "icon_buying.png", name: "Buying Guide", path: "" },
    { img: "icon_selling.png", name: "Selling Guide", path: "" },
    { img: "icon_favorites.png", name: "Verification", path: "" },
    { img: "icon_portfolio.png", name: "Newsroom", path: "" },
    { img: "icon_wallet.png", name: "Company", path: "" },
  ];

  const sellArr: { img: string; name: string; path: string }[] = [
    { img: "icon_profile.png", name: "New Listing", path: "" },
    { img: "icon_buying.png", name: "Current Listings", path: "" },
    { img: "icon_selling.png", name: "Pending Sales", path: "" },
    { img: "icon_favorites.png", name: "History", path: "" },
    { img: "icon_portfolio.png", name: "Professional Tools", path: "" },
  ];
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
          <li
            className={styles.nav_link}
            onMouseEnter={() => isFocus(obj.name)}
            key={obj.path}
          >
            <Link to={obj.path}>{obj.name}</Link>
            <div className={styles.dropdown}>
              <PopUp
                objectArr={
                  navigate === "About"
                    ? aboutArr
                    : navigate === "Sell"
                    ? sellArr
                    : null
                }
              />
            </div>
          </li>
        ))}
      </nav>
    </div>
  );
};

export default HeaderNavigation;
