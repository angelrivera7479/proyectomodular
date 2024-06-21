import { Chat, Question } from "../config/db.js";

const handleChatEvents = (socket) => {
  //#region getChatList, addNewChat
  async function getChatList(user) {
    const chatList = await Chat.where("user").equals(user._id);
    return chatList;
  }

  socket.on("client_addNewChat", async (user) => {
    //Crear nuevo chat, asignando el usuario correspondiente
    const newChat = await new Chat({ user: user._id });
    //Guardar nuevo chat
    await newChat.save();

    //Enviar lista de chats del usuario correspondiente
    const chatList = await getChatList(user);
    socket.emit("server_chatList", chatList);
  });

  //Esto lo unico que hará es darme la lista de chats del usuario correspondiente.
  socket.on("client_chatList", async (user) => {
    const chatList = await getChatList(user);
    socket.emit("server_chatList", chatList);
  });

  //#endregion

  socket.on("client_deleteChat", async (id, user) => {
    const chat = await Chat.findOneAndDelete({ _id: id }).populate("questions");
    const questions = chat.questions;
    questions.map(async (question) => {
      await Question.findOneAndDelete({ _id: question._id });
    });
    const chatList = await getChatList(user);
    socket.emit("server_chatList", chatList);
  });
};

export default handleChatEvents;
