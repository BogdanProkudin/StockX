import header_styles from "../components/AuthUser/styles.module.scss";

import HeaderAuth from "../components/AuthUser/HeaderAuth";
import ResetPassword from "../components/AuthUser/ResetPassword/index";
const ResetPage = () => {
  return (
    <div className={header_styles.auth_user_page_container}>
      <HeaderAuth />
      <ResetPassword />
    </div>
  );
};

export default ResetPage;
