import React from "react";
import styles from "./styles.module.scss";
import popUpStyles from "../PopUp/styles.module.scss";
import PopUp from "../PopUp/index";
import { Link } from "react-router-dom";
const HeaderNavigation: React.FC = () => {
  const [onFocus, setOnFocus] = React.useState<boolean | null>(null);
  const [navigateName, setNavigateName] = React.useState<string | null>(null);

  const isFocus = (name: string) => {
    console.log("Enter");

    if (name === "About" || name === "Sell") {
      setNavigateName(name);
      setOnFocus(true);
    } else {
      setOnFocus(false);
    }
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
  const navigationLinks: { name: string; path: string }[] = [
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
      <nav className={popUpStyles.dropdown}>
        {navigationLinks.map((obj) => (
          <div
            onMouseEnter={() => isFocus(obj.name)}
            className={popUpStyles.navigation_link_item}
          >
            <Link key={obj.path} to={obj.path}>
              {obj.name}
            </Link>
            {onFocus && (
              <PopUp
                objectArr={
                  navigateName === "About"
                    ? aboutArr
                    : navigateName === "Sell" && sellArr
                }
              />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default HeaderNavigation;
