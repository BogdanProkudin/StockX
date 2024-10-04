import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.scss";
type AuthSwitcherProps = {
  authMode: string;
  setAuthMode: Dispatch<SetStateAction<string>>;
};
const AuthSwitcher: React.FC<AuthSwitcherProps> = ({
  authMode,
  setAuthMode,
}) => {
  const authModes = ["Sign Up", "Sign In"];
  return (
    <div className={styles.auth_mode_container}>
      <div className={styles.auth_mode_header_container}>
        {authModes.map((authName) => {
          return (
            <button
              key={authName}
              className={authMode === authName ? styles.active_button : ""}
              onClick={() => setAuthMode(authName)}
            >
              {authName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AuthSwitcher;
