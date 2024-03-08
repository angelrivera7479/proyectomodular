import express from "express";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { Server as SocketServer } from "socket.io";
import colors from "colors";

//Conectar con base de datos
import connectDB from "./db.js";
connectDB();

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

io.on("connect", (socket) => {
  console.log("Client connected: ", socket.id);

  //Recibimos mensaje del cliente
  socket.on("message", (body) => {
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(6),
    });
  });
});

const URI = process.env.mongoUri;

/*
Probar variables de entorno
app.get("/", (req, res) => {
  // the responseMessage object extracts its values from environment variables
  // If a value is not found, it instead stores the string "not found"
  const responseMessage = {
    environment: process.env.environment || "Not found",
    apiBaseUrl: process.env.apiBaseUrl || "Not found",
    mongoUri: process.env.mongoUri || "Not found",
    PORT: process.env.PORT || "Not found",
  };
  console.log(PORT);
  res.send(responseMessage);
});*/

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(colors.white.underline("Server on port ", PORT));
});
