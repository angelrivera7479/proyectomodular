import Mexico from "@svg-maps/mexico";
import { SVGMap } from "react-svg-map";
import "./styles/mapStyle.css";
import "./styles/mappage.css";

import { useState } from "react";
import InfoCard from "../components/Infocard";
import Estados from "../utils/Estados";
import Chat from "../components/Chat";

export default function MapPage() {
  const [estado, setEstado] = useState();
  const [input, setInput] = useState("");
  const [showInfoCard, setShowInfoCard] = useState(false);

  const submitHandler = () => {
    alert("Username: " + input);
  };

  const callback = () => {
    setShowInfoCard(false);
  };

  return (
    <>
      <div className="container-map">
        <Chat />
        <SVGMap
          locationClassName="location"
          className="mysvg"
          onLocationClick={(e) => {
            Estados.forEach((element) => {
              if (element.id === e.target.id) {
                setEstado(element);
                setShowInfoCard(true);
                return;
              }
            });
          }}
          map={Mexico}
        />
        {showInfoCard ? <InfoCard estado={estado} callback={callback} /> : null}
      </div>
    </>
  );
}
//<div>Estado del hijo: {hijo}</div>
//<InfoCard id={estado} callback={callThisFromChildComponent} />
