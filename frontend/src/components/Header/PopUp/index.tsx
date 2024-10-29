import React from "react";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../../redux/hook";
import { setLogout } from "../../../redux/slices/authSlice";
interface PopupProps {
  objectArr: { name: string; img: string; path: string }[] | null;
}
const index: React.FC<PopupProps> = ({ objectArr }) => {
  const dispatch = useAppDispatch();
  const onClickLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLogout());
    window.location.reload();
  };
  return (
    <ul className={styles.header_popUp_link_container}>
      {objectArr?.map((obj) => (
        <div key={obj.name} className={styles.header_popUP_link_wrapper}>
          <span>{obj.img}</span>

          <li
            onClick={obj.name === "Log Out" ? onClickLogout : () => {}}
            className={styles.header_popUP_link}
          >
            {obj.name}
          </li>
        </div>
      ))}
    </ul>
  );
};

export default index;
