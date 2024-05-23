import Chat from "../models/Chat.js";
import Question from "../models/Question.js";

import obtenerRespuesta from "../SistemaExperto/script.js";

const handleChatEvents = (socket) => {
  //#region getChatList, addNewChat
  async function getChatList(user) {
    const chatList = await Chat.where("user").equals(user._id);
    return chatList;
  }

  //Esto lo unico que hará es darme la lista de chats del usuario correspondiente.
  socket.on("client_chatList", async (user) => {
    const chatList = await getChatList(user);
    socket.emit("server_chatList", chatList);
  });

  socket.on("client_addNewChat", async (user) => {
    //Crear nuevo chat, asignando el usuario correspondiente
    const newChat = await new Chat({ user: user._id });
    //Guardar nuevo chat
    await newChat.save();

    //Enviar lista de chats del usuario correspondiente
    const chatList = await getChatList(user);
    socket.emit("server_chatList", chatList);
  });
  //#endregion

  socket.on("client_addQuestion", async ({ chatActivo, pregunta }) => {
    //Encontrar chat activo
    const chat = await Chat.findById(chatActivo);

    //Preparar respuesta
    const respuesta = obtenerRespuesta(pregunta);
    const question = await new Question({
      question: pregunta,
      answer: respuesta,
    });
    await question.save();
    console.log(question);

    await chat.questions.push(question);
    await chat.save();

    socket.emit("server_chat", respuesta);
  });
};

export default handleChatEvents;
