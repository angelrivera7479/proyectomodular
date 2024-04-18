import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./Pages/MapPage";
import SigninPage from "./Pages/SigninPage";
import AdminPage from "./Pages/AdminPage";
import TopBar from "./components/Topbar";
import Prueba from "./components/Prueba";
import ProtectedRoute from "./auth/ProtectedRoute";
import { SiteData } from "./auth/SiteWrapper";

function App() {
  const { user } = SiteData();
  return (
    <>
      <Router>
        <TopBar />
        <Routes>
          <Route index element={<MapPage />} />
          <Route path={"/signin"} element={<SigninPage />} />
          <Route path={"/map"} element={<MapPage />} />
          <Route
            path={"/admin/*"}
            element={
              <ProtectedRoute
                isAllowed={!!user && user.roles.includes("admin")}
                redirectTo="/"
              >
                <AdminPage />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<div>dashboard</div>} />
            <Route path="users-list" element={<div>userslist</div>} />
            <Route path="users-add" element={<div>usersadd</div>} />
            <Route path="chats-active" element={<div>chatactive</div>} />
            <Route path="chats-inactive" element={<div>chatinactive</div>} />
            <Route path="attribute-add" element={<div>attributeadd</div>} />
            <Route
              path="attribute-modify"
              element={<div>attributemodify</div>}
            />
            <Route
              path="attribute-remove"
              element={<div>attributeremove</div>}
            />
          </Route>
          <Route path="/prueba" element={<Prueba />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
