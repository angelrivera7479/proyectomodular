import { useState } from "react";
import "./index.css";

function Chat() {
  const [input, setInput] = useState();

  return (
    <div className="chat-container">
      <input
        className="input"
        placeholder="Escribe aqui"
        type="text"
        value={input}
        id="input"
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="button">Enviar</button>
      <div className="message-container">
        ¡Hola Soy tu ChatBot! Puedo ayudarte a encontrar los mejores (Lugares,
        Playas, Lagos) de México según tus gustos. Puedes probar con 'Dime una
        playa cálida' o 'Dime que lugar cerca del centro de Jalisco puedo
        visitar'
      </div>
    </div>
  );
}

export default Chat;
