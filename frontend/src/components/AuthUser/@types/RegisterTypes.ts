import { UseFormRegister, FieldError, UseFormWatch } from "react-hook-form";

export type Inputs = {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
};
export type SignUpInputProps = {
  name: keyof Inputs;
  register: UseFormRegister<any>;
  errors: FieldError | any;
  watch: UseFormWatch<Inputs>;
};
