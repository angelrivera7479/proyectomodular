import { SiteData } from "../../../auth/SiteWrapper";
import { TbLogout } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.css";
import { useEffect } from "react";

function index() {
  const { user, logout } = SiteData();
  const location = useLocation();

  const isAdmin = user && user.roles.includes("admin") ? true : false;

  const regex = /\admin.*/;
  const isAtAdminPage = regex.test(location.pathname) ? true : false;

  return (
    <div>
      {isAdmin ? (
        isAtAdminPage ? (
          <Link to="/">
            <button className={styles.admin}>Pagina principal</button>
          </Link>
        ) : (
          <Link to="/admin/dashboard">
            <button className={styles.admin}>Panel de Admin</button>
          </Link>
        )
      ) : null}
      <hr />
      {user ? (
        <div className={styles.userInfo}>
          <div className={styles.userIcon}>
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className={styles.username}>{user.username}</div>
          <TbLogout
            role="button"
            onClick={logout}
            className={styles.logout}
            title="Cerrar Sesión"
          />
        </div>
      ) : (
        <Link to="/signin">
          <button className={styles.login}>Login</button>
        </Link>
      )}
    </div>
  );
}

export default index;
