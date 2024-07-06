import { useState } from "react";

import { MapPageWrapper } from "../components/clientComponents/MapPageWrapper";
import styles from "./styles/mapPage.module.css";

import Sidebar from "../components/clientComponents/Sidebar";
import Chat from "../components/clientComponents/Chat";

import Mexico from "@svg-maps/mexico";
import { SVGMap } from "react-svg-map";

import Estados from "../utils/Estados";
import InfoCard from "../components/clientComponents/Infocard";

export default function MapPage() {
  const [estado, setEstado] = useState();
  const [showInfoCard, setShowInfoCard] = useState(false);

  const callback = () => {
    setShowInfoCard(false);
  };

  return (
    <MapPageWrapper>
      <div className={styles.mainContainer}>
        <Sidebar />

        <SVGMap
          locationClassName={styles.location}
          className={styles.mysvg}
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

        <Chat />
        {showInfoCard ? <InfoCard estado={estado} callback={callback} /> : null}
      </div>
    </MapPageWrapper>
  );
}
