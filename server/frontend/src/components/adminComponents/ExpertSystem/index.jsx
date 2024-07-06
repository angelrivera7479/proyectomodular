import { useEffect, useReducer, useState } from "react";
import { SiteData } from "../../../auth/SiteWrapper";
import styles from "./index.module.css";

function ExpertSystem() {
  const { socket } = SiteData();

  const [formData, setFormData] = useReducer(
    (olddata, newdata) => {
      return { ...olddata, ...newdata };
    },
    { nombre: "", temperatura: "", ubicacionCentroCiudad: "" }
  );

  //Funcion para agregar nuevo Estado
  const [newEstado, setNewEstado] = useState();
  const submitNewEstado = () => {
    socket.emit("client_newEstado", newEstado);
  };

  //Obtener y asignar Lista de Estados
  const [estadosList, setEstadosList] = useState([]);

  useEffect(() => {
    socket.emit("client_getEstados");
  }, []);

  useEffect(() => {
    socket.on("server_getEstados", (data) => {
      setEstadosList(data);
    });

    return () => {
      socket.off("server_getEstados", () => {
        setEstadosList(data);
      });
    };
  });

  //Estado
  const [estadoActivo, setEstadoActivo] = useState("Jalisco");

  //Categoria(Lugar, Playa, Lago)
  const [tipoUbicacionActiva, setTipoUbicacionActiva] = useState("Playa");

  const submitUbicacionHandler = () => {
    socket.emit(
      "client_newUbicacion",
      formData,
      estadoActivo,
      tipoUbicacionActiva
    );
  };

  return (
    <>
      <h3>Añadir Estado</h3>
      <div className={styles.addStateContainer}>
        <input
          placeholder="Estado"
          type="text"
          id="estado"
          onChange={(e) => setNewEstado(e.target.value)}
          className={styles.input}
        />
        <button onClick={submitNewEstado} className={styles.button}>
          Enviar
        </button>
      </div>

      <h3>Añadir Ubicacion</h3>
      <div className={styles.addLocationContainer}>
        <input
          placeholder="Nombre de la ubicacion"
          type="text"
          value={formData.nombre}
          id="nombre"
          onChange={(e) => setFormData({ nombre: e.target.value })}
          className={styles.input}
        />
        <input
          placeholder="Temperatura"
          type="text"
          value={formData.temperatura}
          id="temperatura"
          onChange={(e) => setFormData({ temperatura: e.target.value })}
          className={styles.input}
        />
        <input
          placeholder="Ubicacion Centro Ciudad"
          type="text"
          value={formData.ubicacionCentroCiudad}
          id="ubicacionCentroCiudad"
          onChange={(e) =>
            setFormData({ ubicacionCentroCiudad: e.target.value })
          }
          className={styles.input}
        />
        <select
          onChange={(e) => setEstadoActivo(e.target.value)}
          className={styles.select}
        >
          {estadosList.map((element, idx) => (
            <option key={element.nombre} value={element.nombre}>
              {element.nombre}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setTipoUbicacionActiva(e.target.value)}
          className={styles.select}
        >
          <option key={"playa"} value="Playa">
            Playa
          </option>
          <option key={"lugar"} value="Lugar">
            Lugar
          </option>
          <option key={"lago"} value="Lago">
            Lago
          </option>
        </select>
        <button onClick={submitUbicacionHandler} className={styles.button}>
          Enviar
        </button>
      </div>
    </>
  );
}

export default ExpertSystem;
