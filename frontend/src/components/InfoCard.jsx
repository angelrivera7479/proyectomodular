import { useTheme } from "@emotion/react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getImageUrl } from "../utils/image-util";

export default function InfoCard({ estado, callback }) {
  const data = 12444;

  return (
    <Box
      sx={{
        width: "250px",
        height: "300px",
        backgroundColor: "white",
        borderRadius: "10px",
        position: "absolute",
        padding: "10px",
        top: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        sx={{
          position: "relative",
          top: 0,
          left: "30%",
          backgroundColor: "steelblue",
          color: "white",
          "&:hover": {
            backgroundColor: "white",
            color: "steelblue",
          },
        }}
        onClick={() => {
          callback();
        }}
      >
        Cerrar
      </Button>
      <img src={getImageUrl(estado.image)} alt="" width="100%" height="150px" />
      <Typography>{estado.name}</Typography>
      <Typography sx={{ overflow: "hidden", overflowY: "scroll" }}>
        {estado.description}
      </Typography>
    </Box>
  );
}

/*
<img src={image} />

      <Typography>{estado.name}</Typography>
      <Typography sx={{ overflow: "hidden", overflowY: "scroll" }}>
        {estado.description}
      </Typography>*/
