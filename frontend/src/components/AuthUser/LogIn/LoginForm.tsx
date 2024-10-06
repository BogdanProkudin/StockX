import React from "react";
import styles from "./styles.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";

import { LoginInputs } from "../@types/LoginTypes";
import LoginInput from "./LoginInput";
const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginInputs>({});

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {};

  return (
    <div>
      <form
        className={styles.logIn_form_container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <LoginInput
          name="email"
          register={register}
          watch={watch}
          errors={errors.email}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
