import { useState, useEffect } from "react";
import { SiteData } from "../../../auth/SiteWrapper";
import styles from "./index.module.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { MapPageData } from "../MapPageWrapper";

function index() {
  const { socket, user } = SiteData();
  const { handleChatActivo } = MapPageData();

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    if (user) socket.emit("client_chatList", user);
  }, [user]);

  useEffect(() => {
    if (user) {
      socket.on("server_chatList", (serverChatList) => {
        setChatList(serverChatList);
      });
    } else {
      setChatList([]);
    }

    return () => {
      socket.off("server_chatList", user);
    };
  }, [user]);

  return (
    <div>
      <div style={{ color: "white" }}>ChatList</div>
      {chatList.map((chat, index) => (
        <div className={styles.containerChat} key={index}>
          {/* Aqui iria el updatedAt */}
          <div className={styles.fecha}>
            {new Date(chat.createdAt).toLocaleString()}
          </div>
          <button
            onClick={() => handleChatActivo(chat._id)}
            // onClick={() => alert(`hola: ${chat}`)} //Aqui pondriamos el id => chat._id
            className={styles.tituloChat}
          >
            {index}
            {/*Aqui pondriamos el texto de la ultima pregunta que se hizo*/}
          </button>
          <button
            className={styles.deleteChat}
            onClick={() => {
              socket.emit("client_deleteChat", chat._id, user);
              handleChatActivo(null);
            }}
          >
            <FaRegTrashCan />
          </button>
        </div>
      ))}
    </div>
  );
}

export default index;
