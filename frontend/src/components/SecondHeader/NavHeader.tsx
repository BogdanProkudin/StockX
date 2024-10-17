import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { arrHeaderMainLinks } from "../../assets/SecondHeader/HeaderDropDownLinks";
import Dropdown from "./Dropdown/Dropdown";
import { teal } from "@mui/material/colors";

const NavigationHeader = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [isMenuHovered, setIsMenuHovered] = useState(false);

  const [activeLinkName, setActiveLinkName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownAnimatingLink, setDropdownAnimatingLink] = useState("");

  useEffect(() => {
    let showDropdownTimer: any;
    let hideDropdownTimer: any;

    if (isMenuHovered) {
      clearTimeout(hideDropdownTimer);

      showDropdownTimer = setTimeout(() => {
        setIsOpen(true);
        setDropdownAnimatingLink(activeLinkName);
        setIsDropdownVisible(true);
      }, 600);
    } else {
      clearTimeout(showDropdownTimer);
      setActiveLinkName("");

      setIsOpen(false);

      hideDropdownTimer = setTimeout(() => {
        setDropdownAnimatingLink("");
        setIsDropdownVisible(false);
      }, 600);
    }

    return () => {
      clearTimeout(showDropdownTimer);
      clearTimeout(hideDropdownTimer);
    };
  }, [isMenuHovered, activeLinkName]);

  const handleMouseEnter = (linkName: string) => {
    setIsMenuHovered(true);

    setActiveLinkName(linkName);
  };

  const handleMouseLeave = () => {
    setIsMenuHovered(false);
  };

  const handleDropdownMouseEnter = () => {
    setIsMenuHovered(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsMenuHovered(false);
  };

  return (
    <header className={styles.nav_header}>
      <div className={styles.wrapper_nav_header}>
        <ul className={styles.flex_nav_header}>
          {arrHeaderMainLinks.map((obj) => (
            <>
              <li
                onMouseEnter={() => handleMouseEnter(obj.name)}
                onMouseLeave={handleMouseLeave}
                key={obj.name}
                className={styles.navheader_links}
              >
                <Link to={obj.path}>{obj.name}</Link>
                <div
                  className={`${styles.header_navigation_item_line} ${
                    activeLinkName === obj.name ? styles.active : ""
                  }`}
                ></div>
              </li>
              {isDropdownVisible && dropdownAnimatingLink === obj.name && (
                <li
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                  className={`${styles.sub_navigation} ${
                    isDropdownVisible ? styles.active : ""
                  }`}
                >
                  <Dropdown
                    subLinkName={dropdownAnimatingLink}
                    content={obj.content}
                  />
                </li>
              )}
            </>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavigationHeader;
