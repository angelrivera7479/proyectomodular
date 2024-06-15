import React, { useEffect, useState } from "react";
import { SiteData } from "../../../auth/SiteWrapper";
import "react-circular-progressbar/dist/styles.css";
import styles from "./index.module.css";

function ActiveChats() {
  const [positives, setPositives] = useState([]);
  const [negatives, setNegatives] = useState([]);
  const [noScore, setNoScore] = useState([]);

  const { socket } = SiteData();

  //Cuando se monte el componente, solicitamos el promedio.
  useEffect(() => {
    socket.emit("client_getQuestionsInfo");
  }, []);

  const receiveQuestionsInfo = (positives, negatives, noScore) => {
    setPositives(positives);
    setNegatives(negatives);
    setNoScore(noScore);
  };

  useEffect(() => {
    socket.on("server_getQuestionsInfo", receiveQuestionsInfo);
    return () => {
      socket.off("server_getQuestionsInfo", receiveQuestionsInfo);
    };
  }, []);

  const handleUpdateScore = () => {
    socket.emit("client_getQuestionsInfo");
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
      <table>
        <tr>
          <td style={{ backgroundColor: "gray" }}>Pregunta</td>
          <td style={{ backgroundColor: "gray" }}>Respuesta</td>
        </tr>
        {positives.map((element, idx) => (
          <tr key={idx}>
            <td>{element.question}</td>
            <td>{element.answer}</td>
          </tr>
        ))}
      </table>
      <h3>Negativos</h3>
      <table>
        <tr>
          <td style={{ backgroundColor: "gray" }}>Pregunta</td>
          <td style={{ backgroundColor: "gray" }}>Respuesta</td>
        </tr>
        {negatives.map((element, idx) => (
          <tr key={idx}>
            <td>{element.question}</td>
            <td>{element.answer}</td>
          </tr>
        ))}
      </table>
      <h3>No Evaluados</h3>
      <table>
        <tr>
          <td style={{ backgroundColor: "gray" }}>Pregunta</td>
          <td style={{ backgroundColor: "gray" }}>Respuesta</td>
        </tr>
        {noScore.map((element, idx) => (
          <tr key={idx}>
            <td>{element.question}</td>
            <td>{element.answer}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default ActiveChats;
