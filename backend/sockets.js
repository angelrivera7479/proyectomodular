import handleUserEvents from "./handleEvents/handleUserEvents.mjs";
import handleChatEvents from "./handleEvents/handleChatEvents.mjs";
import handleQuestionEvents from "./handleEvents/handleQuestionEvents.mjs";
import adminUserEvents from "./handleEvents/adminUserEvents.mjs";

export default (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected: ", socket.id);

    handleUserEvents(socket);

    handleChatEvents(socket);

    handleQuestionEvents(socket);

    adminUserEvents(socket);

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
};
