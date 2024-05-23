import Mexico from "@svg-maps/mexico";
import { SVGMap } from "react-svg-map";
import "./styles/mapStyle.css";

import { useState } from "react";
import InfoCard from "../components/Infocard";
import Estados from "../utils/Estados";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

import styles from "./styles/mapPage.module.css";
import { MapPageWrapper } from "../components/MapPageWrapper";

export default function MapPage() {
  const [estado, setEstado] = useState();
  const [showInfoCard, setShowInfoCard] = useState(false);

  const callback = () => {
    setShowInfoCard(false);
  };

  return (
    <>
      <MapPageWrapper>
        <div className={styles.mainContainer}>
          <div className={styles.listContainer}>
            <Sidebar />
          </div>
          <div className={styles.mapContainer}>
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
          </div>
          <div className={styles.chatContainer}>
            <Chat />
          </div>
          {showInfoCard ? (
            <div className={styles.infoCard}>
              <InfoCard estado={estado} callback={callback} />
            </div>
          ) : null}
        </div>
      </MapPageWrapper>
    </>
  );
}
