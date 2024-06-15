import { Schema } from "mongoose";

const ubicacionSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
    temperatura: {
      type: Number,
      required: true,
    },
    ubicacionCentroCiudad: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default ubicacionSchema;
