import React, { useEffect, useState } from "react";
import { SiteData } from "../../../auth/SiteWrapper";
import "react-circular-progressbar/dist/styles.css";
import styles from "./index.module.css";

function ActiveChats() {
  const [positives, setPositives] = useState([]);
  const [negatives, setNegatives] = useState([]);
  const [noScore, setNoScore] = useState([]);

  const { socket } = SiteData();

  //Cuando se monte el componente, solicitamos los arreglos.
  useEffect(() => {
    socket.emit("client_getAllQuestions");
  }, []);

  const receiveAllQuestions = (positives, negatives, noScore) => {
    setPositives(positives);
    setNegatives(negatives);
    setNoScore(noScore);
  };

  useEffect(() => {
    socket.on("server_getAllQuestions", receiveAllQuestions);
    return () => {
      socket.off("server_getAllQuestions", receiveAllQuestions);
    };
  }, []);

  const handleUpdateScore = () => {
    socket.emit("client_getAllQuestions");
  };

  useEffect(() => {
    socket.on("to-admins", handleUpdateScore);
    return () => {
      socket.off("to-admins", handleUpdateScore);
    };
  });

  return (
    <>
      <h3>Positivos</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <td style={{ backgroundColor: "gray" }}>Pregunta</td>
            <td style={{ backgroundColor: "gray" }}>Respuesta</td>
          </tr>
        </thead>
        <tbody>
          {positives.map((element, idx) => (
            <tr key={idx}>
              <td>{element.question}</td>
              <td>{element.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Negativos</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <td style={{ backgroundColor: "gray" }}>Pregunta</td>
            <td style={{ backgroundColor: "gray" }}>Respuesta</td>
          </tr>
        </thead>
        <tbody>
          {negatives.map((element, idx) => (
            <tr key={idx}>
              <td>{element.question}</td>
              <td>{element.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>No Evaluados</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <td style={{ backgroundColor: "gray" }}>Pregunta</td>
            <td style={{ backgroundColor: "gray" }}>Respuesta</td>
          </tr>
        </thead>
        <tbody>
          {noScore.map((element, idx) => (
            <tr key={idx}>
              <td>{element.question}</td>
              <td>{element.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ActiveChats;
