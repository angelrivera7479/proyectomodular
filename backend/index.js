import express from "express";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { Server as SocketServer } from "socket.io";
import colors from "colors";
import cors from "cors";
import sockets from "./sockets.js";

//Conectar con base de datos
import connectDB from "./config/db.js";
connectDB();

const app = express();
app.use(cors());
app.get("/", function (req, res) {
  res.send("<h1>BackEnd - Proyecto Modular</h1>");
  res.end();
});
const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: "https://proyecto-modular-client.vercel.app/",
  },
});

//Son los eventos del socket
//Es donde esta el io.on("connection", (socket) => {}
sockets(io);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(colors.white.underline("Server on port ", PORT));
});
