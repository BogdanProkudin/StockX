import styles from "./styles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import {
  setIsSearching,
  setSearchValue,
} from "../../../redux/slices/searchSlice";
const HeaderLogo = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogoClick = () => {
    dispatch(setSearchValue(""));
    dispatch(setIsSearching(false));
    navigate("/");
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.header_navbar}>
      <Link onClick={handleLogoClick} to={"/"}>
        <svg
          id="stockx-logo"
          viewBox="0 0 331 66"
          preserveAspectRatio="none"
          i18next-orgval-1="
"
          i18next-orgval-3="
"
          i18next-orgval-5="
"
          i18next-orgval-7="
"
          i18next-orgval-9="
"
          i18next-orgval-11="
"
          i18next-orgval-13="
"
          alt-i18next-orgval="StockX"
        >
          <path
            d="M306.958 45.2861L331.001 65.8705V49.4029L311.777 32.9445L331.001 16.4676V0L297.406 28.7951V20.5844L273.364 0V16.4676L292.587 32.9261L273.364 49.4029V65.8705L306.958 37.0758V45.2861Z"
            fill="#006340"
            id="svg_1"
            fillOpacity="1"
          ></path>
          <path
            d="M33.4302 27.6656L22.6438 25.6071C16.6329 24.4544 13.9982 23.0547 13.9982 19.761C13.9982 15.1501 19.1854 12.7622 25.6903 12.7622C32.5244 12.7622 38.6174 15.3971 39.9348 20.9961H51.4623C50.1449 10.2922 40.5112 3.29346 25.6903 3.29346C12.0221 3.29346 1.23581 9.30433 1.23581 20.1729C1.23581 29.6418 9.30497 34.4175 20.0913 36.4759L30.8776 38.5344C36.8885 39.6871 39.9348 41.5809 39.9348 45.2861C39.9348 50.3086 34.3358 53.1083 27.4194 53.1083C18.9385 53.1083 13.2572 48.9913 11.9398 42.816H0.000732422C1.72982 55.1666 11.4457 62.5771 27.4193 62.5771C41.6639 62.5771 52.6972 56.8134 52.6972 44.8743C52.6972 34.335 44.2164 29.7241 33.4302 27.6656Z"
            fill="#006340"
            id="svg_2"
            fillOpacity="1"
          ></path>
          <path
            d="M80.1159 10.2923V4.11694H68.1769V8.64555C68.1769 13.9975 65.7067 16.4677 60.3547 16.4677H56.9789V25.5249H66.4478V47.7563C66.4478 57.6369 71.3057 61.7538 82.833 61.7538H92.6313V52.6965H83.9035C79.7866 52.6965 78.3868 51.4615 78.3868 47.7562V25.5248H92.6313V16.4677H74.9286L80.1159 10.2923Z"
            fill="#006340"
            id="svg_3"
            fillOpacity="1"
          ></path>
          <path
            d="M183.368 53.5198C174.723 53.5198 169.206 47.4267 169.206 39.1929C169.206 30.9591 174.723 24.8661 183.368 24.8661C190.038 24.8661 194.813 28.5713 196.048 33.0999H207.823C205.682 22.396 196.378 15.8088 183.368 15.8088C167.806 15.8088 157.02 25.1954 157.02 39.1929C157.02 53.1904 167.806 62.577 183.368 62.577C196.378 62.577 206.588 55.9899 208.234 44.8742H196.46C195.225 48.9912 190.779 53.5198 183.368 53.5198Z"
            fill="#006340"
            id="svg_4"
            fillOpacity="1"
          ></path>
          <path
            d="M124.085 15.8088C108.029 15.8088 97.7363 25.1954 97.7363 39.1929C97.7363 53.1904 108.029 62.577 124.085 62.577C140.141 62.577 150.433 53.1904 150.433 39.1929C150.433 25.1954 140.141 15.8088 124.085 15.8088ZM124.085 53.5198C115.439 53.5198 109.922 47.4267 109.922 39.1929C109.922 30.9591 115.439 24.8661 124.085 24.8661C132.73 24.8661 138.247 30.9591 138.247 39.1929C138.247 47.4268 132.73 53.5198 124.085 53.5198Z"
            fill="#006340"
            id="svg_5"
            fillOpacity="1"
          ></path>
          <path
            d="M239.029 37.7109L263.813 16.4675H247.757L227.502 34.2526V4.1167H215.563V61.7536H227.502V47.5915L234.66 41.4557L252.039 61.7536H267.189L246.604 37.7109H239.029Z"
            fill="#006340"
            id="svg_6"
            fillOpacity="1"
          ></path>
        </svg>
      </Link>
    </div>
  );
};

export default HeaderLogo;
