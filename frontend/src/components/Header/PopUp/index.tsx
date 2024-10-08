import React from "react";
import styles from "./styles.module.scss";
interface IpopUpProps {
  objectArr: { img: string; name: string }[];
  onMouseFocus: () => void;
  onMouseUnFocus: () => void;
}
const index: React.FC<IpopUpProps> = ({
  objectArr,
  onMouseFocus,
  onMouseUnFocus,
}) => {
  return (
    <div
      onMouseEnter={onMouseFocus}
      onMouseLeave={onMouseUnFocus}
      className={styles.root}
    >
      <ul>
        {objectArr.map((obj) => (
          <div key={obj.name} className={styles.flex_wrapper_link}>
            <li className={styles.info_link}>{obj.name}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default index;
