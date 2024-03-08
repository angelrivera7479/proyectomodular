import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./components/Map";
import HomePage from "./Pages/HomePage";
import Admin from "./Pages/Admin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/map"} element={<Map />} />
          <Route path={"/admin"} element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
