import { NavLink } from "react-router-dom";
import "./index.css";

function Navbar() {
  return (
    <div className="container">
      <NavLink to={"dashboard"}>
        <button>Dashboard</button>
      </NavLink>
      <NavLink to={"users-list"}>
        <button>Listado de Usuarios</button>
      </NavLink>
      <NavLink to={"users-add"}>
        <button>Añadir Usuarios</button>
      </NavLink>
      <NavLink to={"chats-active"}>
        <button>Chats Activos</button>
      </NavLink>
      <NavLink to={"chats-inactive"}>
        <button>Chats Finalizados</button>
      </NavLink>
      <NavLink to={"attribute-add"}>
        <button>Añadir Atributo</button>
      </NavLink>
      <NavLink to={"attribute-modify"}>
        <button>Modificar Atributo</button>
      </NavLink>
      <NavLink to={"attribute-remove"}>
        <button>Eliminar Atributo</button>
      </NavLink>
    </div>
  );
}

export default Navbar;
