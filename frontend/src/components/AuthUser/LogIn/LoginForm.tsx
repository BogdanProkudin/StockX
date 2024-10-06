import React from "react";
import styles from "./styles.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";

import { LoginInputs } from "../@types/LoginTypes";
import LogInInput from "./LoginInput";
import LogInButton from "./LogInButton";
const LogInForm: React.FC = () => {
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
        <LogInInput
          name="email"
          register={register}
          watch={watch}
          errors={errors.email}
        />
        <LogInInput
          name="password"
          register={register}
          watch={watch}
          errors={errors.password}
        />
        <LogInButton />
      </form>
    </div>
  );
};

export default LogInForm;
