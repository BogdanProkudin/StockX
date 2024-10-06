// App.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import SignUpInput from "./SignUpInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";
import SignUpButton from "./SignUpButton";
import { Inputs } from "../@types/RegisterTypes";
import { useEffect } from "react";
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
  secondName: Yup.string().min(8, "userName").required("Username is required"),
  firstName: Yup.string().min(8).required("NAME"),
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
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
