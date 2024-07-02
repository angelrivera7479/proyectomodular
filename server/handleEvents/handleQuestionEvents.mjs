import { Chat, Question, QuestionGuest } from "../config/db.js";
import obtenerRespuesta from "../SistemaExperto/script.js";

const handleQuestionEvents = (socket) => {
  async function getQuestionsList(chatActivo) {
    const chat = await Chat.findById(chatActivo).populate("questions");
    return chat.questions;
  }

  socket.on("client_getQuestionsList", async (chatActivo) => {
    const questionsList = await getQuestionsList(chatActivo);

    socket.emit("server_getQuestionsList", questionsList);
  });

  socket.on("client_addQuestion", async ({ chatActivo, pregunta }) => {
    console.log("client_addQuestion");
    //Encontrar chat activo
    console.log(chatActivo);
    const chat = await Chat.findById(chatActivo);

    //Preparar respuesta
    const respuesta = obtenerRespuesta(pregunta);
    //Creamos el nuevo documento
    const question = await new Question({
      question: pregunta,
      answer: respuesta,
    });
    await question.save();

    //Agregar la nueva pregunta al arreglo de preguntas
    chat.lastQuestion = question;
    await chat.questions.push(question);
    await chat.save();

    const questionsList = await getQuestionsList(chatActivo);
    socket.emit("server_getQuestionsList", questionsList);
    socket.to("admins").emit("to-admins");
  });

  socket.on("client_questionGuest", async (pregunta) => {
    const respuesta = obtenerRespuesta(pregunta);
    const questionGuest = await new QuestionGuest({
      question: pregunta,
      answer: respuesta,
    });
    questionGuest.save();
    socket.emit("server_questionGuest", questionGuest);
    socket.to("admins").emit("to-admins");
  });
  //--------------------------------------------Score
  socket.on("client_changeScore", async ({ id, value }) => {
    const question = await Question.findById(id);
    value === "like" ? (question.score = 1) : (question.score = -1);
    await question.save();
    socket.to("admins").emit("to-admins");
  });
  socket.on("client_changeScoreGuest", async ({ id, value }) => {
    const question = await QuestionGuest.findById(id);
    value === "like" ? (question.score = 1) : (question.score = -1);
    await question.save();
    socket.to("admins").emit("to-admins");
  });
};

export default handleQuestionEvents;
