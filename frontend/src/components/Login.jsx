import { FormControl, InputLabel, Input } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    alert("Username: " + username + "Password: " + password);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FormControl>
        <InputLabel>Username</InputLabel>
        <Input id="username" onChange={(e) => setUsername(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel>Password</InputLabel>
        <Input id="password" onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <button onClick={submitHandler}>Iniciar sesión</button>
      <button onClick={submitHandler}>Iniciar sesión como invitado</button>
    </Box>
  );
}

export default Login;
