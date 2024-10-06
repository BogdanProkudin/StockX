import LoginErrors from "./LoginErrors";
import LoginForm from "./LoginForm";
import styles from "./styles.module.scss";
const LogIn = () => {
  return (
    <div className={styles.logIn_container}>
      <span>Login</span>
      <LoginForm />
      <LoginErrors />
    </div>
  );
};

export default LogIn;
