import { getImageUrl } from "../../../utils/image-util";
import styles from "./index.module.css";

export default function InfoCard({ estado, callback }) {
  return (
    <div className={styles.containerCard}>
      <button onClick={() => callback()}>Cerrar</button>
      <img src={getImageUrl(estado.image)} alt="" width="100%" height="120px" />
      {estado.name}
      <p className={styles.description}>{estado.description}</p>
    </div>
  );
}
