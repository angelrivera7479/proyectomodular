import handleUserEvents from "./handleEvents/handleUserEvents.mjs";
import handleChatEvents from "./handleEvents/handleChatEvents.mjs";
import handleQuestionEvents from "./handleEvents/handleQuestionEvents.mjs";
import adminUserEvents from "./handleEvents/adminUserEvents.mjs";

export default (io) => {
  io.on("connection", (socket) => {
    let id = socket.id;
    console.log("Client connected: ", id);

    handleUserEvents(socket);

    handleChatEvents(socket);

    handleQuestionEvents(socket);

    adminUserEvents(socket);

    socket.on("disconnect", () => {
      console.log("Cliente desconectado: ", id);
    });
  });

  io.engine.on("connection_error", (err) => {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
  });
};
