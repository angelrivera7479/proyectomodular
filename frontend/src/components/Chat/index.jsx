import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { SiteData } from "../../auth/SiteWrapper";
import { MapPageData } from "../MapPageWrapper";

function Chat() {
  const [pregunta, setPregunta] = useState();
  const [chatLog, setChatLog] = useState([]);

  const { socket } = SiteData();
  const { chatActivo } = MapPageData();

  const submitClick = () => {
    setChatLog([...chatLog, pregunta]);
    socket.emit("client_addQuestion", {
      pregunta: pregunta,
      chatActivo: chatActivo,
    });
  };

  const receiveMessage = (data) => {
    setChatLog((state) => [...state, data]);
  };

  useEffect(() => {
    socket.on("server_chat", receiveMessage);

    return () => {
      socket.off("server_chat", receiveMessage);
    };
  }, []);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder="Escribe aqui"
          type="text"
          id="pregunta"
          onChange={(e) => setPregunta(e.target.value)}
        />
        <button className={styles.button} onClick={submitClick}>
          Enviar
        </button>
        {chatActivo}
      </div>

      <div className={styles.dialogContainer}>
        <div className={styles.messageContainer}>
          ¡Hola Soy tu ChatBot! Puedo ayudarte a encontrar los mejores (Lugares,
          Playas, Lagos) de México según tus gustos. Puedes probar con 'Dime una
          playa cálida' o 'Dime que lugar cerca del centro de Jalisco puedo
          visitar'
        </div>
        <div className={styles.chatlog} id="chat-log">
          {chatLog.map((message, index) => (
            <p
              key={index}
              style={{
                backgroundColor: "lightslategrey",
                borderRadius: "0.5rem",
                padding: "0.5rem",
              }}
              className={`${styles.prueba} ${
                index % 2 === 0 ? styles.non : styles.par
              } `}
            >
              {index % 2 === 0 ? `You: ${message}` : `Bot: ${message}`}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chat;
