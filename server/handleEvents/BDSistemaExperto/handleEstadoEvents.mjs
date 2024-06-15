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
};
export default handleEstadoEvents;
