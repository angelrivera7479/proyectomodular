import { User } from "../config/db.js";

const handleUserEvents = (socket) => {
  socket.on("client_login", async (data) => {
    //Data es un objeto con los atributos username y password
    const user = await User.findOne(
      //Buscamos un usuario que corresponda con la informacion enviada
      { username: data.username, password: data.password },
      //Seleccionamos solo los campos username y roles
      "username roles chats"
    );
    //Regresar el usuario al cliente
    socket.emit("server_login", user);
  });

  socket.on("client_signup", async ({ username, password }) => {
    //Revisar que el username este libre
    const exists = await User.findOne({ username: username }, "username");
    //Si no existe, lo registramos. Si existe, notificamos que el usuario no es valido
    if (!exists) {
      try {
        const newUser = new User({ username: username, password: password });
        await newUser.save();
        const user = {
          _id: newUser._id,
          username: newUser.username,
          roles: newUser.roles,
        };
        //Regresar el objeto con el id, username y roles al cliente
        socket.emit("server_signup", user);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("El username ya existe, escoge otro");
    }
  });
};
export default handleUserEvents;
