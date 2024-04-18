import { Link } from "react-router-dom";
import { SiteData } from "../../auth/SiteWrapper";
import "./index.css";

function Topbar() {
  const { user, logout } = SiteData();
  return (
    <div className="container-topbar">
      <p>Proyecto Modular</p>
      {user ? (
        <>
          <div>
            {user.username}
            {user.roles.includes("admin") ? (
              <Link to="/admin">
                <button>Admin</button>
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
  );
}

export default Topbar;
