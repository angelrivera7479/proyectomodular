import { Estado } from "../config/dbSE.js";

async function FormatDB() {
  //Declar banco de datos vacio
  const bancoDatos = { lugares: {}, lagos: {}, playas: {} };

  const estados = await Estado.find()
    .populate("lugares")
    .populate("playas")
    .populate("lagos");

  estados.map((estado) => {
    if (estado.lugares.length !== 0) {
      bancoDatos.lugares[estado.nombre] = estado.lugares;
    }
    if (estado.lagos.length !== 0) {
      bancoDatos.lagos[estado.nombre] = estado.lagos;
    }
    if (estado.playas.length !== 0) {
      bancoDatos.playas[estado.nombre] = estado.playas;
    }
  });
  return bancoDatos;
}
export default FormatDB;
