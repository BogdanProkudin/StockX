import React, { memo } from "react";
import styles from "./styles.module.scss";

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
                  <span>{obj.title}</span>
                  <div
                    className={`${styles.dropdown_sublink_main_wrapper} ${
                      obj.title === "All Brands" ? styles.threecolumn : ""
                    }`}
                  >
                    {obj.sub_link.map((obj: any) => (
                      <span className={styles.sublink}>{obj.name}</span>
                    ))}
                  </div>
                </div>
              );
            })
          : content.map((obj: any) => {
              return (
                <div className={styles.dropdown_flex_column}>
                  <span>{obj.title}</span>
                  <div className={styles.dropdown_sublink_wrapper}>
                    {obj.sub_link.map((obj: any) => (
                      <span className={styles.sublink}>{obj.name}</span>
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
