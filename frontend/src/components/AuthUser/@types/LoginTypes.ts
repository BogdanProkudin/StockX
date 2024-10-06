import { UseFormRegister, FieldError, UseFormWatch } from "react-hook-form";
export type LoginInputs = {
  email: string;
  password: string;
};
export type LoginInputPros = {
  name: keyof LoginInputs;
  register: UseFormRegister<any>;
  errors: FieldError | undefined;
  watch: UseFormWatch<LoginInputs>;
};
