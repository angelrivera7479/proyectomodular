import { useReducer } from "react";
import { SiteData } from "../../auth/SiteWrapper";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function Signup() {
  const { signup } = SiteData();
  const navigate = useNavigate();

  const [formData, setFormData] = useReducer(
    (olddata, newdata) => {
      return { ...olddata, ...newdata };
    },
    { username: "", password: "" }
  );

  const submitHandler = () => {
    signup(formData);
    navigate("/map");
  };

  return (
    <div className={styles.container}>
      Signup
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
      <button onClick={submitHandler}>Registrarse</button>
    </div>
  );
}

export default Signup;
