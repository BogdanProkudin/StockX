import SignUpError from "./SignUpError";
import SignUpForm from "./SignUpForm";
import styles from "./styles.module.scss";
const SignUp = () => {
  return (
    <div className={styles.signUp_container}>
      <SignUpError />
      <span>Sign Up</span>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
