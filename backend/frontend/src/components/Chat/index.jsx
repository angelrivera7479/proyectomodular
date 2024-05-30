import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { SiteData } from "../../auth/SiteWrapper";
import { MapPageData } from "../MapPageWrapper";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";

function Chat() {
  const [pregunta, setPregunta] = useState();
  const [questionsList, setQuestionsList] = useState([]);

  const { socket, user } = SiteData();
  const { chatActivo } = MapPageData();

  useEffect(() => {
    if (chatActivo) {
      socket.emit("client_getQuestionsList", chatActivo);

      socket.on("server_getQuestionsList", (serverQuestionslist) => {
        setQuestionsList(serverQuestionslist);
      });
    } else {
      setQuestionsList([]);
    }

    return () => {
      socket.off("server_getQuestionsList", chatActivo);
    };
  }, [chatActivo]);

  const submitClick = () => {
    if (user) {
      socket.emit("client_addQuestion", {
        chatActivo: chatActivo,
        pregunta: pregunta,
      });
    } else {
      socket.emit("questionWOUser", pregunta);
    }
  };

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
      </div>

      <div className={styles.dialogContainer}>
        <div className={styles.messageContainer}>
          ¡Hola Soy tu ChatBot! Puedo ayudarte a encontrar los mejores (Lugares,
          Playas, Lagos) de México según tus gustos. Puedes probar con 'Dime una
          playa cálida' o 'Dime que lugar cerca del centro de Jalisco puedo
          visitar'
        </div>
      </div>
      <div className={styles.questionsListContainer}>
        {questionsList.map((element, index) => (
          <div key={index} style={{ border: "1px solid darkslategray" }}>
            <p style={{ color: "white" }}>{element.question}</p>
            <p style={{ color: "white" }}>{element.answer}</p>
            <input type="radio" name="score" id="good" />
            <FaThumbsUp style={{ color: "green" }} />
            <input type="radio" name="score" id="bad" />
            <FaThumbsDown style={{ color: "red" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;

{
  /* <div className={styles.chatlog} id="chat-log">
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
</div>; */
}
