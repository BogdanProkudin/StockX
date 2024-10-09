import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import styles from "./styles.module.scss";
import { IReserInputProps } from "../@types/ResetPasswordTypes";
import { useState } from "react";
const ResetInput = ({
  register,
  watch,
  placeholder,
  name,
}: IReserInputProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <>
      <div className={styles.reset_input_container}>
        <input
          className={styles.reset_input}
          type={isShowPassword ? "text" : "password"}
          {...register(name, {
            required: "Please confirm your password",
            validate: () =>
              password === confirmPassword || "Passwords do not match",
          })}
        />

        {isShowPassword ? (
          <IoEyeOutline
            onClick={() => setIsShowPassword(!isShowPassword)}
            className={styles.reset_input_password_close_icon}
          />
        ) : (
          <IoEyeOffOutline
            onClick={() => setIsShowPassword(!isShowPassword)}
            className={styles.reset_input_password_close_icon}
          />
        )}

        <label
          className={`${styles.floating_label} ${
            (password.length > 0 && name === "password") ||
            (confirmPassword.length > 1 && name === "confirmPassword")
              ? styles.active
              : ""
          }`}
        >
          {placeholder}
        </label>
      </div>
    </>
  );
};

export default ResetInput;
