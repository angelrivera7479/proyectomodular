import Login from "../components/clientComponents/Login";
import Signup from "../components/clientComponents/Signup";
import { useState } from "react";
import styles from "./styles/signinpage.module.css";

function SigninPage() {
  const [active, setActive] = useState(1);

  return (
    <>
      <div className={styles.mainContainer}>
        <img
          src={new URL(`../imagenes/udg_logo.png`, import.meta.url).href}
          className={styles.logo}
          alt=""
        />
        <div className={styles.contentContainer}>
          <div className={styles.activeForms}>
            <button
              className={styles.button}
              type="button"
              onClick={() => setActive(1)}
            >
              Login
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={() => setActive(2)}
            >
              Signup
            </button>
          </div>
          <div className={styles.formContainer}>
            {active === 1 ? <Login /> : active === 2 ? <Signup /> : null}{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default SigninPage;
