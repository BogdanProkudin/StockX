import React from "react";
import styles from "./styles.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginInputs } from "../@types/LoginTypes";
import LogInInput from "./LoginInput";
import LogInButton from "./LogInButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  setClearValidationErrors,
  setValidationErrors,
} from "../../../redux/slices/authSlice";
import {
  emailLoginValidation,
  passwordLoginValidation,
} from "./LoginValidation";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/thunks/authThunks";
const validationSchema = Yup.object().shape({
  email: emailLoginValidation,
  password: passwordLoginValidation,
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
  const user = useAppSelector((state) => state.userAuth.userData);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    await dispatch(loginUser(data));
  };

  React.useEffect(() => {
    if (user.token) {
      localStorage.setItem("token", user.token);
      navigate("/");
    }
  }, [user, navigate]);
  React.useEffect(() => {
    if (errors) {
      dispatch(setValidationErrors({ errors }));
    }
    return () => {
      dispatch(setClearValidationErrors());
    };
  }, [errors]);
  return (
    <form
      className={styles.logIn_form_container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <LogInInput name="email" register={register} watch={watch} />
      <LogInInput name="password" register={register} watch={watch} />
      <LogInButton />
    </form>
  );
};

export default LogInForm;
