import Mexico from "@svg-maps/mexico";
import { SVGMap } from "react-svg-map";
import {
  FormControl,
  InputLabel,
  Input,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import "../components/mapStyle.css";
import InfoCard from "../components/InfoCard";
import Estados from "../utils/Estados";

export default function MapPage() {
  const [estado, setEstado] = useState();
  const [input, setInput] = useState("");
  const [showInfoCard, setShowInfoCard] = useState(false);

  const submitHandler = () => {
    alert("Username: " + input);
  };

  const callThisFromChildComponent = () => {
    setShowInfoCard(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "lightblue",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            width: "35%",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <FormControl
            sx={{
              width: "70%",
            }}
          >
            <InputLabel>Escribe aqui</InputLabel>
            <Input id="input" onChange={(e) => setInput(e.target.value)} />
          </FormControl>
          <Button
            sx={{
              width: "30%",
              backgroundColor: "steelblue",
              color: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "steelblue",
              },
            }}
            onClick={submitHandler}
          >
            Enviar
          </Button>
          <Typography>
            ¡Hola Soy tu ChatBot! Puedo ayudarte a encontrar los mejores
            (Lugares, Playas, Lagos) de México según tus gustos. Puedes probar
            con 'Dime una playa cálida' o 'Dime que lugar cerca del centro de
            Jalisco puedo visitar'
          </Typography>
        </Box>
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
        {showInfoCard ? (
          <InfoCard estado={estado} callback={callThisFromChildComponent} />
        ) : null}
      </Box>
    </>
  );
}
//<div>Estado del hijo: {hijo}</div>
//<InfoCard id={estado} callback={callThisFromChildComponent} />
