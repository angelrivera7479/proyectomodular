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
    socket.emit("client_getQuestionsGuestInfo");
  }, []);

  //Users
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

  //Guests
  const [positivesGuest, setPositivesGuest] = useState([]);
  const [negativesGuest, setNegativesGuest] = useState([]);
  const [noScoreGuest, setNoScoreGuest] = useState([]);
  const [positiveValueGuest, setPositiveValueGuest] = useState(0);
  const [negativeValueGuest, setNegativeValueGuest] = useState(0);
  const [noScoreValueGuest, setNoScoreValueGuest] = useState(0);

  const receiveQuestionsGuestInfo = (
    positivesGuest,
    negativesGuest,
    noScoreGuest
  ) => {
    setPositivesGuest(positivesGuest);
    setNegativesGuest(negativesGuest);
    setNoScoreGuest(noScoreGuest);

    let total =
      positivesGuest.length + negativesGuest.length + noScoreGuest.length;

    setNoScoreValueGuest(((noScoreGuest.length / total) * 100).toFixed(1));
    setPositiveValueGuest(((positivesGuest.length / total) * 100).toFixed(1));
    setNegativeValueGuest(((negativesGuest.length / total) * 100).toFixed(1));
  };

  useEffect(() => {
    socket.on("server_getQuestionsGuestInfo", receiveQuestionsGuestInfo);
    return () => {
      socket.off("server_getQuestionsGuestInfo", receiveQuestionsGuestInfo);
    };
  }, []);

  const handleUpdateScore = () => {
    socket.emit("client_getQuestionsInfo");
    socket.emit("client_getQuestionsGuestInfo");
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
        Preguntas de Usuarios Registrados:{" "}
        {noScore.length + positives.length + negatives.length}
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
      <hr />
      <h3>
        Preguntas de Invitados:{" "}
        {noScoreGuest.length + positivesGuest.length + negativesGuest.length}
      </h3>
      <div className={styles.graphsContainer}>
        <div className={styles.module}>
          <h3>No evaluados: {noScoreGuest.length}</h3>
          <CircularProgressbar
            key={1}
            value={noScoreValueGuest}
            text={`${noScoreValueGuest}%`}
          />
        </div>
        <div className={styles.module}>
          <h3>Positivos : {positivesGuest.length}</h3>
          <CircularProgressbar
            key={2}
            value={positiveValueGuest}
            text={`${positiveValueGuest}%`}
          />
        </div>
        <div className={styles.module}>
          <h3>Negativos: {negativesGuest.length}</h3>
          <CircularProgressbar
            key={3}
            value={negativeValueGuest}
            text={`${negativeValueGuest}%`}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
