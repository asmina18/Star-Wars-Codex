import { navLinks } from "../../navlinks";
import { NavLink } from "react-router-dom";
import styles from './Navigation.module.scss';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      {navLinks.map((item) => {
        return (
          <NavLink
            key={item.title}
            to={item.link}
            className={styles.navLink}
           // activeClassName={styles.activeNavLink}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}
