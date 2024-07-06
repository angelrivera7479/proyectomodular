import Login from "../components/clientComponents/Login";
import Signup from "../components/clientComponents/Signup";
import { useState } from "react";
import styles from "./styles/signinpage.module.css";

function SigninPage() {
  const [active, setActive] = useState("login");

  const handleActivePage = (activePage) => {
    setActive(activePage);
  };

  return (
    <div className={styles.mainContainer}>
      <img
        src={new URL(`../imagenes/udg_logo.png`, import.meta.url).href}
        className={styles.logo}
        alt=""
      />
      <div className={styles.contentContainer}>
        <div className={styles.formContainer}>
          {active === "login" ? (
            <Login handleActivePage={handleActivePage} />
          ) : active === "signup" ? (
            <Signup handleActivePage={handleActivePage} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
