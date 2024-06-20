import { Estado, Ubicacion } from "../../config/dbSE.js";
import { cargarBD } from "../../SistemaExperto/script.js";

const handleUbicacionEvents = (socket) => {
  socket.on(
    "client_newUbicacion",
    async (
      { nombre, temperatura, ubicacionCentroCiudad },
      estadoActivo,
      tipoUbicacionActiva
    ) => {
      //Buscar si la ubicacion ya existe
      const exists = await Ubicacion.findOne({ nombre: nombre }, "nombre");
      if (!exists) {
        //Si existe
        try {
          //Traer Estado al que se hara la insercion de la ubicacion
          const estado = await Estado.findOne({ nombre: estadoActivo });

          //Crear la nueva ubicacion
          const newUbicacion = new Ubicacion({
            nombre: nombre,
            temperatura: temperatura,
            ubicacionCentroCiudad: ubicacionCentroCiudad,
          });
          newUbicacion.save();
          //Definir en que arreglo se insertara
          switch (tipoUbicacionActiva) {
            case "Playa":
              estado.playas.push(newUbicacion);
              break;
            case "Lugar":
              estado.lugares.push(newUbicacion);
              break;
            case "Lago":
              estado.lagos.push(newUbicacion);
              break;
          }
          estado.save();
          //Actualizar la BD para el sistema experto
          cargarBD();
        } catch (error) {
          console.log("Hubo un error al guardar el registro: ", error);
        }
      } else {
        console.log("La ubicacion ya existe, ingresa otra");
      }
    }
  );
  socket.on("client_getLocations", async () => {
    const query = await Ubicacion.find();

    socket.emit("server_getLocations", query);
  });
};
export default handleUbicacionEvents;
