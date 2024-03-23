import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./Pages/MapPage";
import SigninPage from "./Pages/SigninPage";
import AdminPage from "./Pages/AdminPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<>/</>} />
          <Route path={"/signin"} element={<SigninPage />} />
          <Route path={"/map"} element={<MapPage />} />
          <Route path={"/admin"} element={<AdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
