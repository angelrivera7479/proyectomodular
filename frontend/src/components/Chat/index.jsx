import { useState, useEffect } from "react";
import "./index.css";
import { SiteData } from "../../auth/SiteWrapper";

function Chat() {
  const [input, setInput] = useState();
  const [chatLog, setChatLog] = useState([]);

  const { socket } = SiteData();

  const enviarRespuesta = () => {
    setChatLog([...chatLog, input]);
    socket.emit("client_chat", input);
  };

  useEffect(() => {
    socket.on("server_chat", receiveMessage);

    return () => {
      socket.off("server_chat", receiveMessage);
    };
  }, []);

  const receiveMessage = (data) => {
    setChatLog((state) => [...state, data]);
  };

  return (
    <div className="chat-container">
      <input
        className="input"
        placeholder="Escribe aqui"
        type="text"
        id="input"
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="button" onClick={enviarRespuesta}>
        Enviar
      </button>
      <div className="message-container">
        ¡Hola Soy tu ChatBot! Puedo ayudarte a encontrar los mejores (Lugares,
        Playas, Lagos) de México según tus gustos. Puedes probar con 'Dime una
        playa cálida' o 'Dime que lugar cerca del centro de Jalisco puedo
        visitar'
      </div>
      <div id="chat-log">
        <ul>
          {chatLog.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Chat;
