import Navbar from "../components/adminComponents/Navbar";
import { Outlet } from "react-router-dom";
import styles from "./styles/adminPage.module.css";

export default function AdminPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}
