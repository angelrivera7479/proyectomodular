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
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://proyecto-modular-client.vercel.app/"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(cors());
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "https://proyecto-modular-client.vercel.app/",
    methods: ["GET", "POST"],
    credentials: "true",
  },
});

sockets(io);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(colors.white.underline("Server on port ", PORT));
});
