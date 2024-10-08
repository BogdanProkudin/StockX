import LogInErrors from "./LoginErrors";
import LogInForm from "./LoginForm";

import styles from "./styles.module.scss";
const LogIn = () => {
  return (
    <div className={styles.logIn_container}>
      <LogInErrors />
      <span>Login</span>
      <LogInForm />
    </div>
  );
};

export default LogIn;
