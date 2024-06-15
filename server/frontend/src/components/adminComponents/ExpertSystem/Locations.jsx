import { useEffect, useState } from "react";
import { SiteData } from "../../../auth/SiteWrapper";
import styles from "./location.module.css";

function Locations() {
  const [locations, setLocations] = useState([]);

  const { socket } = SiteData();

  useEffect(() => {
    socket.emit("client_getLocations");
  }, []);

  useEffect(() => {
    socket.on("server_getLocations", handleGetLocations);
    return () => {
      socket.off("server_getLocations", handleGetLocations);
    };
  }, []);

  const handleGetLocations = (data) => {
    console.log(data);
    setLocations(data);
  };

  return (
    <>
      <div className={styles.locationsContainer}>
        <h3>Locations</h3>
        <table>
          <tr>
            <td style={{ backgroundColor: "gray" }}>Nombre</td>
            <td style={{ backgroundColor: "gray" }}>Temperatura</td>
            <td style={{ backgroundColor: "gray" }}>Ubicacion Centro Ciudad</td>
          </tr>
          {locations.map((element, idx) => (
            <tr>
              <td>{element.nombre}</td>
              <td>{element.temperatura}</td>
              <td>{element.ubicacionCentroCiudad}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}

export default Locations;
