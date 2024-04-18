import Login from "../components/Login";
import Signup from "../components/Signup";
import { useState } from "react";
import "./styles/signinpage.css";

function SigninPage() {
  const [active, setActive] = useState(1);

  return (
    <>
      <div className="container-signin">
        <button type="button" onClick={() => setActive(1)}>
          Login
        </button>
        <button type="button" onClick={() => setActive(2)}>
          Signup
        </button>

        {active === 1 ? <Login /> : active === 2 ? <Signup /> : null}
      </div>
    </>
  );
}

export default SigninPage;

/*
import { useNavigate, Outlet, Link } from "react-router-dom";

//Ejecutar useNavigate() nos regresara una funcion para direccionar a la ruta deseada
//Esto de la manera navigate("<<ruta>>")
//Se puede redireccionar de forma programada con la funcion

//Outlet nos permite remplazar los componentes hijos

export default function Dashboard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleClick}>button</button>
      <br />
      <Link to="opcion1">Link a opcion1</Link>;
      <br />
      <Link to="opcion2">Link a opcion2</Link>;
      <Outlet />
    </div>
  );
}
 */
