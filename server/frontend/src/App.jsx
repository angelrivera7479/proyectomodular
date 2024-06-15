import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import { SiteData } from "./auth/SiteWrapper";

import AdminPage from "./Pages/AdminPage";
import MapPage from "./Pages/MapPage";
import SigninPage from "./Pages/SigninPage";

import ActiveChats from "./components/adminComponents/ActiveChats";
import Dashboard from "./components/adminComponents/Dashboard";
import ListUsers from "./components/adminComponents/ListUsers";
import ExpertSystem from "./components/adminComponents/ExpertSystem";

function App() {
  const { user } = SiteData();
  return (
    <>
      <Router>
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
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users-list" element={<ListUsers />} />
            <Route path="chats" element={<ActiveChats />} />
            <Route path="expert-system" element={<ExpertSystem />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
