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
// Add headers before the routes are defined
const allowedOrigins = ["https://proyecto-modular-client.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "https://proyecto-modular-client.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

sockets(io);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(colors.white.underline("Server on port ", PORT));
});
