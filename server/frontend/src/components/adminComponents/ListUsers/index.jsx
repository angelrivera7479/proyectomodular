import { useEffect, useState } from "react";
import { SiteData } from "../../../auth/SiteWrapper";

function ListUsers() {
  const { socket } = SiteData();
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    socket.emit("client_getUsersList");
  }, []);

  const handleGetUsersList = (data) => {
    setUsersList(data);
  };

  useEffect(() => {
    socket.on("server_getUsersList", handleGetUsersList);
    return () => {
      socket.off("server_getUsersList", handleGetUsersList);
    };
  }, []);

  return (
    <>
      Listado de Usuarios
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
