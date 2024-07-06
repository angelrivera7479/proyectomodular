import { useState, useEffect, useReducer } from "react";
import { SiteData } from "../../../auth/SiteWrapper";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { toast } from "sonner";

function Signup({ handleActivePage }) {
  const { socket, handleUserData } = SiteData();
  const navigate = useNavigate();

  const handlePageChange = () => {
    handleActivePage("login");
  };

  const [formData, setFormData] = useReducer(
    (olddata, newdata) => {
      return { ...olddata, ...newdata };
    },
    { username: "", password: "" }
  );

  const submitHandler = () => {
    if (formData.username === "" || formData.password === "") {
      toast.error("Llena ambos campos");
    } else {
      socket.emit("client_signup", formData);
    }
  };

  useEffect(() => {
    socket.on("server_signup", (user) => {
      handleUserData(user);
      navigate("/map");
    });

    return () => {
      socket.off("server_signup");
    };
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const checkHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <h1>Registrar Usuario</h1>
      <input
        placeholder="Username"
        type="text"
        value={formData.username}
        id="username"
        onChange={(e) => setFormData({ username: e.target.value })}
        className={styles.input}
      />
      <input
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        id="password"
        onChange={(e) => setFormData({ password: e.target.value })}
        className={styles.input}
      />
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="checkbox"
          checked={showPassword}
          onChange={checkHandler}
          className={styles.showPassword}
        />
        Mostrar Contraseña
      </div>
      <div className={styles.buttonsContainer}>
        <button onClick={handlePageChange} className={styles.login}>
          Ya tengo cuenta
        </button>
        <button onClick={submitHandler} className={styles.signup}>
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default Signup;
