import React from "react";
import styles from "./Registration.module.scss";
const Registration: React.FC = () => {
  return (
    <>
      <form className={styles.registrForm}>
        <h3 className={styles.title}>Sign Up</h3>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        {/* At least 8 characters, 1 uppercase letter, 1 number & 1 symbol */}
        {/* <div>
          <input type="text" />
          <p>Remember me</p>
        </div>
        <div>
          <input type="text" />
          <p>Remember me</p>
        </div> */}
        <button></button>
      </form>
    </>
  );
};

export default Registration;
