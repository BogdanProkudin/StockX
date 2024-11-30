import { useForm } from "react-hook-form";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { ResetInputs } from "../@types/ResetPasswordTypes";
import ResetInput from "./ResetInput";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hook";
import {
  setClearResetPasswordError,
  setResetPassowrdError,
} from "../../../redux/slices/authSlice";
import {
  confirmPasswordValidationSchema,
  resetPasswordValidationSchema,
} from "./ResetPasswordValidation";
import ResetButton from "./ResetButton";
import { resetPassword } from "../../../redux/thunks/authThunks";
const validationSchema = Yup.object().shape({
  password: resetPasswordValidationSchema,
  confirmPassword: confirmPasswordValidationSchema,
});
const ResetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetInputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: ResetInputs) => {
    const path = location.pathname;
    const tokenFromUrl = path.split("/resetPassword/")[1];
    dispatch(
      resetPassword({
        resetPasswordToken: tokenFromUrl,
        newPassword: data.password,
      }),
    );
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (errors) {
      dispatch(setResetPassowrdError({ errors }));
    }
    return () => {
      dispatch(setClearResetPasswordError());
    };
  }, [errors]);

  return (
    <form
      className={styles.reset_password_form_container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ResetInput
        register={register}
        name="password"
        watch={watch}
        placeholder="New Password"
      />
      <ResetInput
        register={register}
        name="confirmPassword"
        watch={watch}
        placeholder="Confirm passowrd"
      />
      <ResetButton />
    </form>
  );
};

export default ResetForm;
