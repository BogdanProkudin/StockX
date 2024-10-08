import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { ResetInputs } from "../@types/ResetPasswordTypes";
import ResetInput from "./ResetInput";

const ResetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetInputs>();

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
