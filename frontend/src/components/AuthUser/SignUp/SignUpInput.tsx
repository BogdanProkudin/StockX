import { useEffect, useState } from "react";
import { UseFormRegister, FieldError, UseFormWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { setValidationErrors } from "../../../store/slices/authSlice";
import { IoEyeOutline } from "react-icons/io5";
import styles from "./styles.module.scss";
import { Inputs } from "./SignUpForm";
import { IoEyeOffOutline } from "react-icons/io5";
type SignUpInputProps = {
  name: keyof Inputs;
  register: UseFormRegister<any>;
  errors: FieldError | undefined;
  watch: UseFormWatch<Inputs>;
};
const SignUpInput: React.FC<SignUpInputProps> = ({
  register,
  watch,
  name,
  errors,
}) => {
  const dispatch = useAppDispatch();
  const validationError = useAppSelector(
    (state) => state.userAuth.validationErrors
  );
  const inputValue = watch(name);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  useEffect(() => {
    if (errors?.message && errors?.message?.length > 1) {
      dispatch(setValidationErrors(errors?.message));
    } else if (validationError.length > 1) {
      dispatch(setValidationErrors(""));
    }
  }, [errors]);
  const placeholders =
    name === "firstName"
      ? "First Name"
      : name === "secondName"
      ? "Last Name"
      : name === "email"
      ? "Email Address"
      : "Password";
  return (
    <div className={styles.signUP_input_container}>
      <input
        type={name}
        className={styles.input_field}
        {...register(name)}
      ></input>
      {name === "password" && !isShowPassword ? (
        <IoEyeOutline
          onClick={() => setIsShowPassword(true)}
          className={styles.signUp_input_password_close_icon}
        />
      ) : (
        name === "password" && (
          <IoEyeOffOutline
            onClick={() => setIsShowPassword(false)}
            className={styles.signUp_input_password_close_icon}
          />
        )
      )}
      <label
        className={
          !inputValue ? styles.floating_label : styles.floating_label_active
        }
      >
        {placeholders}
      </label>
    </div>
  );
};

export default SignUpInput;
