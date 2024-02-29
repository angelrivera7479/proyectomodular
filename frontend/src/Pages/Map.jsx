import Mexico from "@svg-maps/mexico";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";

function Map() {
  return (
    <>
      <div>Hola</div>
      <div>Hola</div>
      <SVGMap map={Mexico} />;
    </>
  );
}

export default Map;
