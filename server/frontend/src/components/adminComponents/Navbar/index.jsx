import { NavLink } from "react-router-dom";
import styles from "./index.module.css";
import UserCard from "../../clientComponents/UserCard";

function Navbar() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div>
          <img
            src="http://www.cusur.udg.mx/es/sites/default/files/manual_de_estilo/logos/udeg/logo_udeg_blanco_horizontal_sin%20benemerita%203.png"
            className={styles.logo}
            alt=""
          />
          <nav className={styles.links}>
            <NavLink to="dashboard">Dashboard</NavLink>
            <NavLink to="users-list">Usuarios</NavLink>
            <NavLink to="chats">Chats</NavLink>
            <NavLink to="expert-system">Sistema Experto</NavLink>
          </nav>
        </div>
        <div className={styles.userCard}>
          <UserCard />
        </div>
      </div>
    </>
  );
}

export default Navbar;
