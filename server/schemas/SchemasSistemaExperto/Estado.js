import mongoose, { Schema } from "mongoose";
import ubicacionSchema from "./Ubicacion.js";

const estadoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    lugares: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Ubicacion",
      required: true,
      default: [],
    },
    lagos: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Ubicacion",
      required: true,
      default: [],
    },
    playas: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Ubicacion",
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default estadoSchema;
