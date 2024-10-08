import React from "react";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../../redux/hook";
import { setLogout } from "../../../redux/slices/authSlice";
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
  const dispatch = useAppDispatch();
  const onClickLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLogout());
  };
  return (
    <div
      onMouseEnter={onMouseFocus}
      onMouseLeave={onMouseUnFocus}
      className={styles.root}
    >
      <ul>
        {objectArr.map((obj) => (
          <div key={obj.name} className={styles.flex_wrapper_link}>
            {/* { тут надо иконки } */}
            <li
              onClick={obj.name === "Log Out" ? onClickLogout : () => {}}
              className={styles.info_link}
            >
              {obj.name}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default index;
