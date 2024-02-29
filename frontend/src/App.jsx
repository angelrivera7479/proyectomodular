import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./components/Map";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/map"} element={<Map />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
