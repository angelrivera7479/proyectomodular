import User from "./models/User.js";
import obtenerRespuesta from "./SistemaExperto/script.js";

export default (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected: ", socket.id);

    socket.on("client_login", async (data) => {
      //Data es un objeto con los atributos username y password
      const user = await User.findOne(
        //Buscamos un usuario que corresponda con la informacion enviada
        { username: data.username, password: data.password },
        //Seleccionamos solo los campos username y roles
        "username roles"
      );
      //Regresar el usuario al cliente
      socket.emit("server_login", user);
    });

    socket.on("client_signup", async ({ username, password }) => {
      //Revisar que el username este libre
      const exists = await User.findOne({ username: username }, "username");
      console.log(exists);
      //Si no existe, lo registramos. Si existe, notificamos que el usuario no es valido
      if (!exists) {
        try {
          const newUser = new User({ username, password });
          await newUser.save();
          const user = {
            _id: newUser._id,
            username: newUser.username,
            roles: newUser.roles,
          };
          console.log(user);
          //Regresar el objeto con el id, username y roles al cliente
          socket.emit("server_signup", user);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("El username ya existe, escoge otro");
      }
    });

    socket.on("client_chat", (data) => {
      console.log(data);
      const respuesta = obtenerRespuesta(data);
      socket.emit("server_chat", respuesta);
    });

    socket.on("send_user", async ({ username, password }) => {
      console.log("Username: ", username, " - Password: ", password);

      try {
        const newUser = new User({ username, password });
        await newUser.save();
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
};
