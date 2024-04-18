import { getImageUrl } from "../../utils/image-util";
import "./index.css";

export default function InfoCard({ estado, callback }) {
  return (
    <div className="container-card">
      <button onClick={() => callback()}>Cerrar</button>
      <img src={getImageUrl(estado.image)} alt="" width="100%" height="150px" />
      {estado.name}
      <p className="description">{estado.description}</p>
    </div>
  );
}
