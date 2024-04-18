import { useReducer } from "react";
import { SiteData } from "../../auth/SiteWrapper";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = SiteData();
  const navigate = useNavigate();

  const [formData, setFormData] = useReducer(
    (olddata, newdata) => {
      return { ...olddata, ...newdata };
    },
    { username: "", password: "" }
  );

  const submitHandler = () => {
    login(formData);
    navigate("/map");
  };
  return (
    <>
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
    </>
  );
}

export default Login;
