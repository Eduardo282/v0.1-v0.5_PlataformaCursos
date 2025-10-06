import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/admin/Login/Login";
import Signup from "./components/admin/Signup/Signup";
import DashboardAdmin from "./components/admin/DashboardAdmin";

class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        </Routes>
      </Router>
    );
  }
}

export default AppRoutes;
