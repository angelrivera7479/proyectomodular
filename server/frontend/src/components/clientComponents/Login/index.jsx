import { useEffect, useReducer } from "react";
import { SiteData } from "../../../auth/SiteWrapper";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { toast } from "sonner";

function Login() {
  const { socket, handleUserData } = SiteData();
  const navigate = useNavigate();

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
      socket.emit("client_login", formData);
    }
  };

  useEffect(() => {
    socket.on("server_login", (user) => {
      handleUserData(user);
      navigate("/map");
    });

    return () => {
      socket.off("server_login");
    };
  }, []);

  return (
    <div className={styles.container}>
      Login
      <input
        placeholder="Username"
        type="text"
        value={formData.username}
        id="username"
        onChange={(e) => setFormData({ username: e.target.value })}
      />
      <input
        placeholder="Password"
        type="text"
        value={formData.password}
        id="password"
        onChange={(e) => setFormData({ password: e.target.value })}
      />
      <button onClick={submitHandler}>Iniciar sesión</button>
    </div>
  );
}

export default Login;
