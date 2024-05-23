import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import { SiteData } from "./auth/SiteWrapper";

import AdminPage from "./Pages/AdminPage";
import MapPage from "./Pages/MapPage";
import SigninPage from "./Pages/SigninPage";

import ActiveChats from "./components/adminComponents/ActiveChats";
import AddUsers from "./components/adminComponents/AddUsers";
import Dashboard from "./components/adminComponents/Dashboard";
import InactiveChats from "./components/adminComponents/InactiveChats";
import ListUsers from "./components/adminComponents/ListUsers";

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
            <Route path="users-add" element={<AddUsers />} />
            <Route path="chats-active" element={<ActiveChats />} />
            <Route path="chats-inactive" element={<InactiveChats />} />
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
