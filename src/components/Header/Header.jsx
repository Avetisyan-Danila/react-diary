import styles from "./Header.module.css";
import SelectUser from "../SelectUser/SelectUser.jsx";

function Header() {
  return (
    <>
      <img
        className={styles.logo}
        width="180"
        src="/logo.svg"
        alt="Логотип дневника"
      />

      <SelectUser />
    </>
  );
}

export default Header;
