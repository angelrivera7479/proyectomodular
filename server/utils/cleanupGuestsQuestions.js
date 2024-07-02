import { QuestionGuest } from "../config/db.js";

export async function cleanUpGuestsQuetsions() {
  try {
    const deadline = new Date();
    deadline.setHours(deadline.getHours() - 12); // Eliminar documentos más antiguos de 12 horas

    // Eliminar documentos con fecha de creación anterior a deadline
    const deletedQuestions = await QuestionGuest.deleteMany({
      createdAt: { $lt: deadline },
    });
    console.log(
      `Se eliminaron ${deletedQuestions.deletedCount} documentos de other_questions.`
    );
  } catch (error) {
    console.log(
      "Error al limpiar la coleccion de preguntas de visitantes: ",
      error
    );
  }
}
