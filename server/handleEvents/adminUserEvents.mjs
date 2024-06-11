import { User, Question } from "../config/db.js";

const adminUserEvents = (socket) => {
  socket.on("client_getUsersList", async () => {
    //Data es un objeto con los atributos username y password
    const query = await User.find({ active: true }).select("username roles");
    console.log(query);

    socket.emit("server_getUsersList", query);
  });

  socket.on("client_getScoreAverage", async () => {
    //Recuperar preguntas
    const query = await Question.find();

    //Calcular promedio de scores
    let promedio = 0;
    query.map((element) => {
      promedio += element.score;
    });
    promedio = Math.abs(promedio / query.length);
    //Ajustar promedio para mostrar en circulo
    promedio = Math.round(promedio * 100);
    socket.emit("server_getScoreAverage", promedio);
  });
};
export default adminUserEvents;
