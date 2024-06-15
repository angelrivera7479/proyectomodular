import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./index.module.css";
import { SiteData } from "../../../auth/SiteWrapper";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function Navbar() {
  const { user, logout } = SiteData();

  const [expanded, setExpanded] = useState(true);
  return (
    <nav className={styles.nav}>
      <div className={styles.topSection}>
        <button
          className={styles.toggleButton}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
        <div className={styles.logoParent}>
          <img
            src="http://www.cusur.udg.mx/es/sites/default/files/manual_de_estilo/logos/udeg/logo_udeg_blanco_horizontal_sin%20benemerita%203.png"
            className={styles.logo}
            alt=""
          />
        </div>
      </div>
      <div className={styles.middleSection}>
        <NavLink to={"dashboard"}>
          <button>Dashboard</button>
        </NavLink>
        <NavLink to={"users-list"}>
          <button>Listado de Usuarios</button>
        </NavLink>
        <NavLink to={"chats"}>
          <button>Chats</button>
        </NavLink>
        <NavLink to={"expert-system"}>
          <button>Sistema Experto</button>
        </NavLink>
      </div>

      <div className={styles.bottomSection}>
        {user ? (
          <>
            <div>
              {user.username}
              {user.roles.includes("admin") ? (
                <Link to="/">
                  <button>Home</button>
                </Link>
              ) : null}
              <button onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <Link to="/signin">
            <button>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
