import LoginErrors from "./LogInErrors";
import LoginForm from "./LogInForm";

import styles from "./styles.module.scss";
const LogIn = () => {
  return (
    <div className={styles.logIn_container}>
      <LoginErrors />
      <span>Login</span>
      <LoginForm />
    </div>
  );
};

export default LogIn;
