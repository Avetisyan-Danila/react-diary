import styles from "./Header.module.css";
import {useContext} from "react";
import {UserContext} from "../../context/user.context.jsx";

function Header() {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (e) => {
    setUserId(Number(e.target.value))
  }

  return (
    <>
      <img
        className={styles.logo}
        width="180"
        src="/logo.svg"
        alt="Логотип дневника"
      />

      <select name="user" id="user" value={userId} onChange={changeUser}>
        <option value="1">Антон</option>
        <option value="2">Вася</option>
      </select>
    </>
  );
}

export default Header;
