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

//----------------------------------------------------Deployment
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

//Render frontend for any path
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/frontend/dist/index.html"));
});

//----------------------------------------------------Deployment

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

//Eventos de socket
import sockets from "./sockets.js";
sockets(io);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(colors.white.underline("Server on port ", PORT));
});
