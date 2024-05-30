import { useState } from "react";
import { SiteData } from "../../../auth/SiteWrapper";

function ListUsers() {
  const { socket } = SiteData();
  const [usersList, setUsersList] = useState([]);

  const handleClick = () => {
    socket.emit("client_getUsersList");

    socket.on("server_getUsersList", (data) => {
      setUsersList(data);
    });
  };

  return (
    <>
      Listado de Usuarios
      <button onClick={handleClick}>Cargar</button>
      {usersList.map((element, index) => (
        <div key={index}>
          --------------------------
          <div key={index}>{element.username}</div>
          <div>
            {element.roles.map((role, idx) => (
              <>
                <div key={idx}>{role}</div>
              </>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default ListUsers;
