import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import cors from "cors";

//Conexión con base de datos
import connectDB from "./config/db.js";
connectDB();

const app = express();

app.use(cors());
app.get("/", function (req, res) {
  res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline'");
  res.send("<h1>BackEnd - Proyecto Modular 29/05/2024</h1>");
  res.end();
});

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "https://proyecto-modular-client.vercel.app/",
  },
});

//Eventos de socket
import sockets from "./sockets.js";
sockets(io);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(colors.white.underline("Server on port ", PORT));
});
