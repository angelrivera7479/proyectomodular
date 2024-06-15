import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import { SiteData } from "../../../auth/SiteWrapper";
import { useState, useEffect } from "react";

const Question = ({ element, index }) => {
  const { socket } = SiteData();

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
    setSelected(value);
    socket.emit("client_changeScore", { id: id, value: value });
  };

  return (
    <div style={{ border: "1px solid darkslategray" }}>
      <p style={{ color: "white" }}>{element.question}</p>
      <p style={{ color: "white" }}>{element.answer}</p>

      <input
        type="radio"
        name={`score-${element._id}`}
        value="like"
        checked={selected === "like"}
        onChange={(e) => handleScore(element._id, e.target.value)}
      />
      <FaThumbsUp style={{ color: "green" }} />
      <input
        type="radio"
        name={`score-${element._id}`}
        value="dislike"
        checked={selected === "dislike"}
        onChange={(e) => handleScore(element._id, e.target.value)}
      />
      <FaThumbsDown style={{ color: "red" }} />
    </div>
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
