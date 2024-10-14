import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import {
  brandsData,
  dealsData,
} from "../../../assets/SecondHeader/HeaderDropDownLinks";

interface DropdownProps {
  subLinkName: string;
  content: any;
}
const Dropdown: React.FC<DropdownProps> = ({ subLinkName, content }) => {
  console.log(subLinkName);
  console.log(content);
  if (content == null) {
    return 0;
  }
  return (
    <div className={styles.dropdown_container}>
      <div
        className={`${styles.dropdown_wrapper} ${
          subLinkName === "Brands" ? styles.brands_wrapper : ""
        }`}
      >
        {subLinkName === "Brands"
          ? content?.map((obj: any) => (
              <div className={styles.dropdown_flex_column}>
                <span>{obj.title}</span>
                <div
                  className={`${styles.dropdown_sublink_main_wrapper} ${
                    obj.title === "All Brands" ? styles.threecolumn : ""
                  }`}
                >
                  {obj.sub_link.map((obj: any) => (
                    <li className={styles.sublink}>{obj.name}</li>
                  ))}
                </div>
              </div>
            ))
          : content.map((obj: any) => (
              <div className={styles.dropdown_flex_column}>
                <span>{obj.title}</span>
                <div className={styles.dropdown_sublink_wrapper}>
                  {obj.sub_link.map((obj: any) => (
                    <li className={styles.sublink}>{obj.name}</li>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Dropdown;
