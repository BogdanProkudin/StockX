import React from "react";
import styles from "./styles.module.scss";
import PopUp from "../PopUp/index";
import { Link } from "react-router-dom";
const HeaderNavigation: React.FC = () => {
  const [onFocus, setOnFocus] = React.useState<string | null>(null);

  const isFocus = (name: string) => {
    if (name === "About" || name === "Sell") {
      setOnFocus(name);
    } else {
      setOnFocus(null);
    }
  };
  const isNotFocus = () => {
    setOnFocus(null);
  };
  const aboutArr: { img: string; name: string }[] = [
    { img: "icon_profile.png", name: "How StockX Works" },
    { img: "icon_buying.png", name: "Buying Guide" },
    { img: "icon_selling.png", name: "Selling Guide" },
    { img: "icon_favorites.png", name: "Verification" },
    { img: "icon_portfolio.png", name: "Newsroom" },
    { img: "icon_wallet.png", name: "Company" },
  ];

  const sellArr: { img: string; name: string }[] = [
    { img: "icon_profile.png", name: "New Listing" },
    { img: "icon_buying.png", name: "Current Listings" },
    { img: "icon_selling.png", name: "Pending Sales" },
    { img: "icon_favorites.png", name: "History" },
    { img: "icon_portfolio.png", name: "Professional Tools" },
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
          <Link
            onMouseEnter={() => isFocus(obj.name)}
            onMouseLeave={isNotFocus}
            key={obj.path}
            to={obj.path}
          >
            {obj.name}
          </Link>
        ))}
        {onFocus && (
          <PopUp
            objectArr={onFocus === "About" ? aboutArr : sellArr}
            onMouseFocus={isFocus}
            onMouseUnFocus={isNotFocus}
          />
        )}
      </nav>
    </div>
  );
};

export default HeaderNavigation;
