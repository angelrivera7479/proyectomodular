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
      <table>
        <tr>
          <td style={{ backgroundColor: "gray" }}>Nombre de Usuario</td>
          <td style={{ backgroundColor: "gray" }}>Roles</td>
        </tr>
        {usersList.map((element, index) => (
          <tr key={index}>
            <td>{element.username}</td>
            <td>
              {element.roles.map((role, idx) => (
                <>
                  <div key={idx}>{role}</div>
                </>
              ))}
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default ListUsers;
