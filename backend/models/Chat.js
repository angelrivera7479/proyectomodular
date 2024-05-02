import { Schema, model } from "mongoose";

const consultaSchema = new Schema(
  {
    pregunta: {
      type: String,
      required: true,
    },
    respuesta: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const chatSchema = new Schema(
  {
    idChat: {
      type: Number,
      required: true,
    },
    consultas: {
      type: [consultaSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", chatSchema);
