import React, { memo } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { NavigationItem } from "../../../@types/headerTypes";

interface DropdownProps {
  subLinkName: string;
  content: NavigationItem[] | undefined;
}
const Dropdown: React.FC<DropdownProps> = ({ subLinkName, content }) => {
  return (
    <div className={styles.dropdown_container}>
      <div
        className={`${styles.dropdown_wrapper} ${
          subLinkName === "Brands" ? styles.brands_wrapper : ""
        }`}
      >
        {subLinkName === "Brands"
          ? content?.map((obj: NavigationItem, id: number) => {
              return (
                <div key={id} className={styles.dropdown_flex_column_wrapper}>
                  <b className={styles.title}>
                    <Link to={""}>{obj.title}</Link>
                  </b>
                  <div
                    className={`${styles.dropdown_sublink_main_wrapper} ${
                      obj.title === "All Brands" ? styles.threecolumn : ""
                    }`}
                  >
                    {obj.sub_link.map((obj: { name: string; path: string }) => (
                      <span className={styles.sublink}>
                        <Link to={""}>{obj.name}</Link>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          : content?.map((obj: NavigationItem, id: number) => {
              return (
                <div key={id} className={styles.dropdown_flex_column_wrapper}>
                  <b className={styles.title}>
                    <Link to={""}>{obj.title}</Link>
                  </b>
                  <div className={styles.dropdown_sublink_wrapper}>
                    {obj.sub_link.map((obj: { name: string; path: string }) => (
                      <span className={styles.sublink}>
                        <Link to={""}>{obj.name}</Link>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default memo(Dropdown);
