import { useState } from "react";
import { Link } from "react-router-dom";
import { SiteData } from "../../../auth/SiteWrapper";
import styles from "./index.module.css";
import ChatList from "../ChatList";

import {
  FaChevronLeft,
  FaChevronRight,
  FaRegSquarePlus,
} from "react-icons/fa6";

export default function index() {
  const { user, logout, socket } = SiteData();

  const [expanded, setExpanded] = useState(true);

  const newChat = () => {
    if (!user) {
    } else {
      socket.emit("client_addNewChat", user);
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.topSection}>
        <button className={styles.newChatButton} onClick={() => newChat()}>
          <FaRegSquarePlus />
        </button>
        <button
          className={styles.toggleButton}
          onClick={() => {
            console.log(user);
            setExpanded((current) => !current);
          }}
        >
          {expanded ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
        <div className={styles.logoParent}>
          <img
            src={new URL(`../../imagenes/udg_logo.png`, import.meta.url).href}
            className={styles.logo}
            alt=""
          />
        </div>
      </div>

      <div className={styles.middleSection}>
        <ChatList />
      </div>

      <div className={styles.bottomSection}>
        {user ? (
          <>
            <div style={{ color: "white" }}>
              {user.username}
              {user.roles.includes("admin") ? (
                <Link to="/admin/dashboard">
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
    </nav>
  );
}
