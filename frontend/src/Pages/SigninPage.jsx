import Login from "../components/Login";
import Signup from "../components/Signup";
import { useState } from "react";
import styles from "./styles/signinpage.module.css";

function SigninPage() {
  const [active, setActive] = useState(1);

  return (
    <>
      <div className={styles.mainContainer}>
        <img
          src="http://www.cusur.udg.mx/es/sites/default/files/manual_de_estilo/logos/udeg/logo_udeg_blanco_horizontal_sin%20benemerita%203.png"
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
