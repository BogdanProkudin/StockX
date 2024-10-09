import React from "react";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../../redux/hook";
import { setLogout } from "../../../redux/slices/authSlice";
interface IpopUpProps {
  objectArr: { img: string; name: string }[] | any;
}
const index: React.FC<IpopUpProps> = ({ objectArr }) => {
  const dispatch = useAppDispatch();
  const onClickLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLogout());
  };
  return (
    <ul className={styles.dropdown_content}>
      {objectArr.map((obj: any) => (
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
  );
};

export default index;
