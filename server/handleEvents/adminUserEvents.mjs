import User from "../models/User.js";

const adminUserEvents = (socket) => {
  socket.on("client_getUsersList", async () => {
    //Data es un objeto con los atributos username y password
    const query = await User.find({ active: true }).select("username roles");
    console.log(query);

    socket.emit("server_getUsersList", query);
  });
};
export default adminUserEvents;
