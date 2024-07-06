import { User, Question, QuestionGuest } from "../config/db.js";

const adminUserEvents = (socket) => {
  //#region join/leave admin room
  socket.on("join-admin-room", () => {
    socket.join("admins");
    console.log("Añadido a admins: ", socket.id);
  });

  socket.on("leave-admin-room", () => {
    socket.leave("admins");
    console.log("Borrado de admins: ", socket.id);
  });
  //#endregion

  socket.on("client_getUsersList", async () => {
    //Data es un objeto con los atributos username y password
    const query = await User.find({ active: true }).select("username roles");

    socket.emit("server_getUsersList", query);
  });

  socket.on("client_getQuestionsInfo", async () => {
    const query = await Question.find();
    let positives = [],
      negatives = [],
      noScore = [];
    query.map((i) => {
      i.score === 1
        ? positives.push(i)
        : i.score === -1
        ? negatives.push(i)
        : noScore.push(i);
    });
    socket.emit("server_getQuestionsInfo", positives, negatives, noScore);
  });

  socket.on("client_getQuestionsGuestInfo", async () => {
    const query = await QuestionGuest.find();
    let positivesGuest = [],
      negativesGuest = [],
      noScoreGuest = [];
    query.map((i) => {
      i.score === 1
        ? positivesGuest.push(i)
        : i.score === -1
        ? negativesGuest.push(i)
        : noScoreGuest.push(i);
    });
    socket.emit(
      "server_getQuestionsGuestInfo",
      positivesGuest,
      negativesGuest,
      noScoreGuest
    );
  });

  socket.on("client_getAllQuestions", async () => {
    let positives = [],
      negatives = [],
      noScore = [];

    const usersQuestions = await Question.find();
    usersQuestions.map((i) => {
      i.score === 1
        ? positives.push(i)
        : i.score === -1
        ? negatives.push(i)
        : noScore.push(i);
    });

    const guestsQuestions = await QuestionGuest.find();
    guestsQuestions.map((i) => {
      i.score === 1
        ? positives.push(i)
        : i.score === -1
        ? negatives.push(i)
        : noScore.push(i);
    });

    socket.emit("server_getAllQuestions", positives, negatives, noScore);
  });
};
export default adminUserEvents;
