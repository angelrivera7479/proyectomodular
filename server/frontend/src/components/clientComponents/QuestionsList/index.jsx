import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import { SiteData } from "../../../auth/SiteWrapper";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

const Question = ({ element, index }) => {
  const { socket, user } = SiteData();

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (element.score === 1) {
      setSelected("like");
    } else if (element.score === -1) {
      setSelected("dislike");
    } else {
      setSelected(null);
    }
  }, [element.score]);

  const handleScore = (id, value) => {
    if (user) {
      setSelected(value);
      socket.emit("client_changeScore", { id: id, value: value });
    } else {
      setSelected(value);
      socket.emit("client_changeScoreGuest", { id: id, value: value });
    }
  };

  return (
    <>
      <hr />
      <div className={styles.dialog}>
        <div>Tú: {element.question}</div>
        <div>SE: {element.answer}</div>
      </div>

      <div className={styles.radioGroup}>
        <div className={styles.inputContainer}>
          <input
            type="radio"
            name={`score-${element._id}`}
            value="like"
            checked={selected === "like"}
            onChange={(e) => handleScore(element._id, e.target.value)}
          />
          <div className={styles.radioTile}>
            <FaThumbsUp name="buenoIcon" className={styles.faIconThumbsUp} />
            <label htmlFor="bueno">Bueno</label>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="radio"
            name={`score-${element._id}`}
            value="dislike"
            checked={selected === "dislike"}
            onChange={(e) => handleScore(element._id, e.target.value)}
          />
          <div className={styles.radioTile}>
            <FaThumbsDown name="maloIcon" className={styles.faIconThumbsDown} />
            <label htmlFor="malo">Malo</label>
          </div>
        </div>
      </div>
    </>
  );
};

function index({ questionsList }) {
  return (
    <>
      {questionsList.map((element, index) => (
        <Question key={index} element={element} />
      ))}
    </>
  );
}

export default index;
