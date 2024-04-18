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
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

sockets(io);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(colors.white.underline("Server on port ", PORT));
});
