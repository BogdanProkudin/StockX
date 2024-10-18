import React, { memo } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

interface DropdownProps {
  subLinkName: string;
  content: any;
}
const Dropdown: React.FC<DropdownProps> = ({ subLinkName, content }) => {
  console.log(content, subLinkName);

  return (
    <div className={styles.dropdown_container}>
      <div
        className={`${styles.dropdown_wrapper} ${
          subLinkName === "Brands" ? styles.brands_wrapper : ""
        }`}
      >
        {subLinkName === "Brands"
          ? content?.map((obj: any) => {
              return (
                <div className={styles.dropdown_flex_column}>
                  <b className={styles.title}>
                    <Link to={""}>{obj.title}</Link>
                  </b>
                  <div
                    className={`${styles.dropdown_sublink_main_wrapper} ${
                      obj.title === "All Brands" ? styles.threecolumn : ""
                    }`}
                  >
                    {obj.sub_link.map((obj: any) => (
                      <li className={styles.sublink}>
                        <Link to={""}>{obj.name}</Link>
                      </li>
                    ))}
                  </div>
                </div>
              );
            })
          : content.map((obj: any) => {
              return (
                <div className={styles.dropdown_flex_column}>
                  <b className={styles.title}>
                    <Link to={""}>{obj.title}</Link>
                  </b>
                  <div className={styles.dropdown_sublink_wrapper}>
                    {obj.sub_link.map((obj: any) => (
                      <li className={styles.sublink}>
                        <Link to={""}>{obj.name}</Link>
                      </li>
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
