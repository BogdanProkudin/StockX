// App.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import SignUpInput from "./SignUpInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";
import SignUpButton from "./SignUpButton";
import { Inputs } from "../@types/RegisterTypes";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  registerUser,
  setClearValidationErrors,
  setValidationErrors,
} from "../../../redux/slices/authSlice";
import {
  emailValidationSchema,
  firstNameValidationSchema,
  passwordValidationSchema,
  secondNameValidationSchema,
} from "./SignUpValidation";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: emailValidationSchema,
  password: passwordValidationSchema,
  firstName: firstNameValidationSchema,
  secondName: secondNameValidationSchema,
});

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },

    watch,
  } = useForm<Inputs>({
    // shouldFocusError: false, под вопросом
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userAuth.userData);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await dispatch(registerUser(data));
  };
  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      navigate("/profile");
    }
  }, []);
  useEffect(() => {
    if (user.token) {
      localStorage.setItem("token", user.token);
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (errors) {
      dispatch(setValidationErrors({ errors }));
    }
    return () => {
      dispatch(setClearValidationErrors());
    };
  }, [errors]);
  return (
    <form
      className={styles.signUp_form_container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SignUpInput
        watch={watch}
        name="firstName"
        register={register}
        errors={errors}
      />
      <SignUpInput
        name="secondName"
        register={register}
        errors={errors}
        watch={watch}
      />
      <SignUpInput
        watch={watch}
        name="email"
        register={register}
        errors={errors}
      />
      <SignUpInput
        name="password"
        register={register}
        errors={errors}
        watch={watch}
      />

      <SignUpButton />
    </form>
  );
}
