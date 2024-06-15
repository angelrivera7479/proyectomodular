import { Ubicacion } from "../../config/dbSE.js";

const handleUbicacionEvents = (socket) => {
  socket.on(
    "client_newUbicacion",
    async ({ nombre, temperatura, ubicacionCentroCiudad }) => {
      const exists = await Ubicacion.findOne({ nombre: nombre }, "nombre");
      if (!exists) {
        try {
          const newUbicacion = new Ubicacion({
            nombre: nombre,
            temperatura: temperatura,
            ubicacionCentroCiudad: ubicacionCentroCiudad,
          });
          await newUbicacion.save();
          //socket.emit("server_signup", user);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("La ubicacion ya existe, ingrese otra");
      }
    }
  );
  socket.on("client_getLocations", async () => {
    const query = await Ubicacion.find();

    socket.emit("server_getLocations", query);
  });
};
export default handleUbicacionEvents;
