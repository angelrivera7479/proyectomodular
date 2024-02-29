import Mexico from "@svg-maps/mexico";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";

function Map() {
  return <SVGMap map={Mexico} />;
}

export default Map;
