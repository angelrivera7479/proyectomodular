import { useEffect, useState } from "react";
import { SiteData } from "../../../auth/SiteWrapper";
import styles from "./index.module.css";

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
      <h3>Usuarios</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <td style={{ backgroundColor: "gray" }}>Nombre de Usuario</td>
            <td style={{ backgroundColor: "gray" }}>Roles</td>
          </tr>
        </thead>
        <tbody>
          {usersList.map((element, userIndex) => (
            <tr key={`user${userIndex}`}>
              <td>{element.username}</td>
              <td>
                {element.roles.map((role, roleIndex) => (
                  <div key={`role${roleIndex}`}>{role}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ListUsers;
