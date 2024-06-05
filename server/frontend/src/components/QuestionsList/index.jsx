import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import { SiteData } from "../../auth/SiteWrapper";
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
      <p style={{ color: "white" }}>{element._id}</p>

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

// import React, { useState, useEffect } from 'react';

// const RadioButtonGroup = ({ score }) => {
//   const [selectedOption, setSelectedOption] = useState(null);

//   useEffect(() => {
//     if (score === 1) {
//       setSelectedOption('radioButton1');
//     } else if (score === 2) {
//       setSelectedOption('radioButton2');
//     } else {
//       setSelectedOption(null);
//     }
//   }, [score]);

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   return (
//     <div>
//       <label>
//         <input
//           type="radio"
//           value="radioButton1"
//           checked={selectedOption === 'radioButton1'}
//           onChange={handleOptionChange}
//           disabled={score === 0}
//         />
//         Option 1
//       </label>
//       <label>
//         <input
//           type="radio"
//           value="radioButton2"
//           checked={selectedOption === 'radioButton2'}
//           onChange={handleOptionChange}
//           disabled={score === 0}
//         />
//         Option 2
//       </label>
//     </div>
//   );
// };

// export default RadioButtonGroup;
