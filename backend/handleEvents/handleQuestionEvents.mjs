import Chat from "../models/Chat.js";
import Question from "../models/Question.js";

const handleQuestionEvents = (socket) => {
  socket.on("client_getQuestionsList", async (chatId) => {
    console.log(chatId);
    const chat = await Chat.findById(chatId).populate("questions");
    console.log(chat);

    const respuesta = "hola";
    socket.emit("server_getQuestionsList", respuesta);
  });
};

export default handleQuestionEvents;
