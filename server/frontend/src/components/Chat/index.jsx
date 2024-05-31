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
    if (chatActivo && user) {
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
  }, [chatActivo, user]);

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

  useEffect(() => {
    if (!user) {
      socket.on("server_questionWOUser", (data) => {
        setQuestionsList([...questionsList, data]);
        console.log(data);
      });
    }
    return () => {
      socket.off("server_questionWOUser", (data) => {
        setQuestionsList([...questionsList, data]);
        console.log(data);
      });
    };
  }, []);

  const handleScore = (id, value) => {
    console.log(id);
    console.log(value);
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
            <p style={{ color: "white" }}>{element._id}</p>

            <input
              type="radio"
              name="score"
              value="good"
              onChange={(e) => handleScore(element._id, e.target.value)}
            />
            <FaThumbsUp style={{ color: "green" }} />
            <input
              type="radio"
              name="score"
              value="bad"
              onChange={(e) => handleScore(element._id, e.target.value)}
            />
            <FaThumbsDown style={{ color: "red" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
