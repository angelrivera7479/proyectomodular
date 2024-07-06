import { useState } from "react";
import styles from "./index.module.css";
import { SiteData } from "../../../auth/SiteWrapper";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { BiMessageAdd } from "react-icons/bi";

import ChatList from "../ChatList";
import UserCard from "../UserCard";

function index() {
  const { socket, user } = SiteData();
  const [expanded, setExpanded] = useState(true);

  const newChat = () => {
    user ? socket.emit("client_addNewChat", user) : null;
  };

  return (
    <div className={`${styles.mainContainer} ${expanded ? styles.open : ""}`}>
      <div className={styles.buttons}>
        <button
          onClick={() => {
            setExpanded((current) => !current);
          }}
          title={expanded ? "Esconder Sidebar" : "Mostrar Sidebar"}
          className={styles.toggleButton}
        >
          {expanded ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
        {user ? (
          <button
            onClick={() => newChat()}
            title="Crear nuevo chat"
            className={styles.addNewChat}
          >
            <BiMessageAdd />
          </button>
        ) : null}
      </div>
      <div>
        <img
          src="http://www.cusur.udg.mx/es/sites/default/files/manual_de_estilo/logos/udeg/logo_udeg_blanco_horizontal_sin%20benemerita%203.png"
          className={styles.logo}
          alt=""
        />
        <ChatList />
      </div>
      <UserCard />
    </div>
  );
}

export default index;
