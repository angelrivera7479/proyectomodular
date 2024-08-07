import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { SiteData } from "../../../auth/SiteWrapper";
import { MapPageData } from "../MapPageWrapper";
import QuestionsList from "../QuestionsList";
import { toast } from "sonner";

function Chat() {
  const [pregunta, setPregunta] = useState("");
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
    if (pregunta === "" || pregunta === undefined) {
      toast.error("Ingrese algo para consultar");
    } else {
      if (user) {
        socket.emit("client_addQuestion", {
          chatActivo: chatActivo,
          pregunta: pregunta,
        });
      } else {
        socket.emit("client_questionGuest", pregunta);
      }
      setPregunta("");
    }
  };

  useEffect(() => {
    if (!user) {
      socket.on("server_questionGuest", (data) => {
        setQuestionsList([...questionsList, data]);
      });
    }
    return () => {
      socket.off("server_questionGuest");
    };
  }, [user]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder="Escribe aqui"
          type="text"
          id="pregunta"
          value={pregunta}
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
        <QuestionsList questionsList={questionsList} />
      </div>
    </div>
  );
}

export default Chat;
