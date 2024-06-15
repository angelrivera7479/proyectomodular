import { useReducer, useState } from "react";
import { SiteData } from "../../../auth/SiteWrapper";
import styles from "./index.module.css";
import Locations from "./Locations";

function ExpertSystem() {
  const [formData, setFormData] = useReducer(
    (olddata, newdata) => {
      return { ...olddata, ...newdata };
    },
    { nombre: "", temperatura: "", ubicacionCentroCiudad: "" }
  );
  const [estado, setEstado] = useState("");

  const { socket } = SiteData();

  const submitUbicacionHandler = () => {
    socket.emit("client_newUbicacion", formData);
  };
  const submitEstadoHandler = () => {
    socket.emit("client_newEstado", estado);
  };
  return (
    <>
      <div>
        Ubicacion
        <input
          placeholder="Nombre de la ubicacion"
          type="text"
          value={formData.nombre}
          id="nombre"
          onChange={(e) => setFormData({ nombre: e.target.value })}
        />
        <input
          placeholder="Temperatura"
          type="text"
          value={formData.temperatura}
          id="temperatura"
          onChange={(e) => setFormData({ temperatura: e.target.value })}
        />
        <input
          placeholder="Ubicacion Centro Ciudad"
          type="text"
          value={formData.ubicacionCentroCiudad}
          id="ubicacionCentroCiudad"
          onChange={(e) =>
            setFormData({ ubicacionCentroCiudad: e.target.value })
          }
        />
        <button onClick={submitUbicacionHandler}>Enviar</button>
      </div>
      <div>
        Estado
        <input
          placeholder="Estado"
          type="text"
          id="estado"
          onChange={(e) => setEstado(e.target.value)}
        />
        <button onClick={submitEstadoHandler}>Enviar</button>
      </div>
      <div style={{ overflow: "auto" }}>
        <Locations />
      </div>
    </>
  );
}

export default ExpertSystem;
