// App.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import SignUpInput from "./SignUpInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";
import SignUpButton from "./SignUpButton";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  secondName: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  firstName: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

export type Inputs = {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
};

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      className={styles.signUp_form_container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SignUpInput
        watch={watch}
        name="firstName"
        register={register}
        errors={errors.email}
      />
      <SignUpInput
        name="secondName"
        register={register}
        errors={errors.password}
        watch={watch}
      />
      <SignUpInput
        watch={watch}
        name="email"
        register={register}
        errors={errors.email}
      />
      <SignUpInput
        name="password"
        register={register}
        errors={errors.password}
        watch={watch}
      />

      <SignUpButton />
    </form>
  );
}
