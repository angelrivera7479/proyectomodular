import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
