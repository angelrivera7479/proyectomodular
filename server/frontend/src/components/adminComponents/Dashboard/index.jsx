import React, { useEffect, useState } from "react";
import { SiteData } from "../../../auth/SiteWrapper";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Dashboard() {
  const [average, setAverage] = useState(0);

  const { socket } = SiteData();

  const receiveScoreAverage = (data) => {
    setAverage(data);
  };

  useEffect(() => {
    socket.emit("client_getScoreAverage");

    socket.on("server_getScoreAverage", receiveScoreAverage);

    return () => {
      socket.off("server_getScoreAverage", receiveScoreAverage);
    };
  }, []);

  return (
    <div>
      Porcentaje de aprobacion: {`${average}%`}
      <div style={{ width: "10%" }}>
        <CircularProgressbar value={average} text={`${average}%`} />
      </div>
    </div>
  );
}

export default Dashboard;
