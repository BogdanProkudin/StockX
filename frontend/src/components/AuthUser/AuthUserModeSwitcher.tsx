import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  setAuthSwitcher,
  setClearBackendErrors,
  setClearValidationErrors,
} from "../../redux/slices/authSlice";

const AuthSwitcher: React.FC = () => {
  const authModes = ["Sign Up", "Log In"];
  const dispatch = useAppDispatch();
  const onClickSwitchAuth = (authName: string) => {
    dispatch(setAuthSwitcher(authName));
    console.log(authName);
    dispatch(setClearValidationErrors());
    dispatch(setClearBackendErrors());
  };
  const authMode = useAppSelector((state) => state.userAuth.stateAuthSwitcher);
  return (
    <div className={styles.auth_mode_header_container}>
      {authModes.map((authName) => {
        return (
          <button
            key={authName}
            className={authMode === authName ? styles.active_button : ""}
            onClick={() => onClickSwitchAuth(authName)}
          >
            {authName}
          </button>
        );
      })}
    </div>
  );
};

export default AuthSwitcher;
