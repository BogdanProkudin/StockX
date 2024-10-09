import { useForm } from "react-hook-form";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { ResetInputs } from "../@types/ResetPasswordTypes";
import ResetInput from "./ResetInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordValidationSchema } from "../SignUp/SignUpValidation";
const validationSchema = Yup.object().shape({
  password: passwordValidationSchema,
  confirmPassword: passwordValidationSchema,
});
const ResetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetInputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: ResetInputs) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <form
      className={styles.reset_form_container}
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
      <input type="submit" />
    </form>
  );
};

export default ResetForm;
