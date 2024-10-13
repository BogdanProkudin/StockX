import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
const NavigationLink = ({ label, setIsComplete }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  const [isZeroWidth, setIsZeroWidth] = useState(false); // отслеживает ширину 0%
  const handleMouseEnter = () => {
    setIsHovered(true); // старт анимации (увеличение ширины)
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // старт анимации (уменьшение ширины)
  };

  const handleAnimationComplete = (definition: any) => {
    if (definition.width === "0%") {
      setIsZeroWidth(true); // ширина достигла 0%
      setIsComplete(false);
      console.log("Ширина достигла 0%");
    } else {
      setIsZeroWidth(false); // ширина не 0%, можно обрабатывать 100%
      setIsComplete(true);
      console.log("Ширина достигла 100%");
    }
  };

  return (
    <div
      className={styles.navheader_links}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>{label}</span>
      <motion.div
        className={styles.header_navigation_item_line}
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onAnimationComplete={handleAnimationComplete}
      />
    </div>
  );
};

const NavigationHeader = () => {
  const arrLinks = ["Brands", "Deals", "New", "Men", "Women", "Kids"];
  const [isComplete, setIsComplete] = useState(false);
  return (
    <header className={styles.nav_header}>
      <div className={styles.wrapper_nav_header}>
        <ul style={{ display: "flex", listStyle: "none" }}>
          {arrLinks.map((link) => (
            <>
              <li key={link} style={{ margin: "0 10px" }}>
                <NavigationLink setIsComplete={setIsComplete} label={link} />
              </li>
              {isComplete && <div className={styles.sub_navigation}></div>}
            </>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavigationHeader;
