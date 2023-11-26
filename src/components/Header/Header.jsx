import styles from  './Header.module.css';

function Header() {
	return (
		<img className={styles.logo} width="180" src="/logo.svg" alt="Логотип дневника"/>
	);
}

export default Header;
