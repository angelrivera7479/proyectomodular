import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";

const MONGO_URI2 = process.env.mongoUri2;

import ubicacionSchema from "../schemas/SchemasSistemaExperto/Ubicacion.js";
import estadoSchema from "../schemas/SchemasSistemaExperto/Estado.js";

let Ubicacion, Estado;

try {
  const connectionDB2 = mongoose.createConnection(MONGO_URI2);
  connectionDB2.once("open", () => {
    console.log(
      colors.cyan.underline(`MongoDB connected SE: ${connectionDB2.name}`)
    );
  });
  Ubicacion = connectionDB2.model("Ubicacion", ubicacionSchema);
  Estado = connectionDB2.model("Estado", estadoSchema);
} catch (error) {
  console.log("Error: ", error);
  process.exit();
}

export { Ubicacion, Estado };
