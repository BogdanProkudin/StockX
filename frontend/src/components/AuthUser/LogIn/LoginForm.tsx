import React from "react";
import styles from "./styles.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginInputs } from "../@types/LoginTypes";
import LogInInput from "./LoginInput";
import LogInButton from "./LogInButton";
import { useAppDispatch } from "../../../redux/hook";
import {
  setClearValidationErrors,
  setValidationErrors,
} from "../../../redux/slices/authSlice";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});
const LogInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginInputs>({
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {};
  React.useEffect(() => {
    if (errors) {
      dispatch(setValidationErrors({ errors }));
    }
    return () => {
      dispatch(setClearValidationErrors());
    };
  }, [errors]);
  return (
    <div>
      <form
        className={styles.logIn_form_container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <LogInInput name="email" register={register} watch={watch} />
        <LogInInput name="password" register={register} watch={watch} />
        <LogInButton />
      </form>
    </div>
  );
};

export default LogInForm;
