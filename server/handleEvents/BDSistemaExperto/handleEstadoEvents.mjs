import { Estado } from "../../config/dbSE.js";

const handleEstadoEvents = (socket) => {
  socket.on("client_newEstado", async (estado) => {
    const exists = await Estado.findOne({ nombre: estado }, "nombre");
    if (!exists) {
      try {
        const newEstado = new Estado({
          nombre: estado,
        });
        await newEstado.save();
        //socket.emit("server_signup", user);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("La Estado ya existe, ingrese otro");
    }
  });

  socket.on("client_getEstados", async () => {
    const estados = await Estado.find()
      .populate("lugares")
      .populate("playas")
      .populate("lagos");
    socket.emit("server_getEstados", estados);
  });
};
export default handleEstadoEvents;
