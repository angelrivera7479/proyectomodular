import Chat from "../models/Chat.js";
import Question from "../models/Question.js";
import obtenerRespuesta from "../SistemaExperto/script.js";

const handleQuestionEvents = (socket) => {
  async function getQuestionsList(chatActivo) {
    const chat = await Chat.findById(chatActivo).populate("questions");
    return chat.questions;
  }

  socket.on("client_getQuestionsList", async (chatActivo) => {
    console.log("------------------------------------------------------------");
    console.log(chatActivo);
    const questionsList = await getQuestionsList(chatActivo);
    console.log(questionsList);
    socket.emit("server_getQuestionsList", questionsList);
  });

  socket.on("client_addQuestion", async ({ chatActivo, pregunta }) => {
    console.log("clientAddQuestion------------------------------------------");
    //Encontrar chat activo
    const chat = await Chat.findById(chatActivo);

    //Preparar respuesta
    const respuesta = obtenerRespuesta(pregunta);
    //Creamos el nuevo documento
    const question = await new Question({
      question: pregunta,
      answer: respuesta,
    });
    await question.save();
    console.log(question);

    //Agregar la nueva pregunta al arreglo de preguntas
    await chat.questions.push(question);
    await chat.save();

    const questionsList = await getQuestionsList(chatActivo);
    socket.emit("server_getQuestionsList", questionsList);
    //socket.emit("server_chat", respuesta);
  });

  socket.on("questionWOUser", async (pregunta) => {
    const respuesta = obtenerRespuesta(pregunta);
    const question = await new Question({
      question: pregunta,
      answer: respuesta,
    });
    socket.emit("server_questionWOUser", question);
  });
};

export default handleQuestionEvents;
