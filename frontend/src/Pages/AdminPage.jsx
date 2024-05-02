import Navbar from "../components/adminComponents/Navbar";
import { Outlet } from "react-router-dom";
import "./styles/adminpage.css";

export default function AdminPage() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
