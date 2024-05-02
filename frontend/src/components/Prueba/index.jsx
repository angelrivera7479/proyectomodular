import { useState, useReducer } from "react";
import socket from "../../../../backend/sockets";

function Prueba() {
  const [formData, setFormData] = useReducer(
    (olddata, newdata) => {
      return { ...olddata, ...newdata };
    },
    { username: "", password: "" }
  );

  const handleClick = () => {
    console.log(formData);
    socket.emit("send_user", formData);
  };

  const [message, setMessage] = useState("");

  const handleMessage = () => {
    socket.emit("find_user", message);
    socket.on("server_login", (data) => {
      console.log(data.username);
    });
  };

  return (
    <>
      <div>
        <input
          placeholder={"Username"}
          type="text"
          value={formData.username}
          id="username"
          onChange={(e) => setFormData({ username: e.target.value })}
        />
        <input
          placeholder={"Password"}
          type="text"
          value={formData.password}
          id="password"
          onChange={(e) => setFormData({ password: e.target.value })}
        />
        <button className="boton" onClick={handleClick}>
          Enviar
        </button>

        <input
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleMessage}>Enviar Mensaje</button>
      </div>
    </>
  );
}

export default Prueba;
