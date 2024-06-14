import React, { useEffect, useState } from "react";
import { SiteData } from "../../../auth/SiteWrapper";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./index.module.css";

function Dashboard() {
  const [positives, setPositives] = useState([]);
  const [negatives, setNegatives] = useState([]);
  const [noScore, setNoScore] = useState([]);
  const [positiveValue, setPositiveValue] = useState(0);
  const [negativeValue, setNegativeValue] = useState(0);
  const [noScoreValue, setNoScoreValue] = useState(0);

  const { socket } = SiteData();

  //Cuando se monte el componente, solicitamos el promedio.
  useEffect(() => {
    socket.emit("client_getQuestionsInfo");
  }, []);

  const receiveQuestionsInfo = (positives, negatives, noScore) => {
    setPositives(positives);
    setNegatives(negatives);
    setNoScore(noScore);

    let total = positives.length + negatives.length + noScore.length;

    setNoScoreValue(((noScore.length / total) * 100).toFixed(1));
    setPositiveValue(((positives.length / total) * 100).toFixed(1));
    setNegativeValue(((negatives.length / total) * 100).toFixed(1));
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
      <h3>
        Total Evaluados: {noScore.length + positives.length + negatives.length}
      </h3>
      <div className={styles.graphsContainer}>
        <div className={styles.module}>
          <h3>No evaluados: {noScore.length}</h3>
          <CircularProgressbar
            key={1}
            value={noScoreValue}
            text={`${noScoreValue}%`}
          />
        </div>
        <div className={styles.module}>
          <h3>Positivos : {positives.length}</h3>
          <CircularProgressbar
            key={2}
            value={positiveValue}
            text={`${positiveValue}%`}
          />
        </div>
        <div className={styles.module}>
          <h3>Negativos: {negatives.length}</h3>
          <CircularProgressbar
            key={3}
            value={negativeValue}
            text={`${negativeValue}%`}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
