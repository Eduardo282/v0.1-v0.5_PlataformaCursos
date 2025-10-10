import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/admin/Login/Login";
import Signup from "./components/admin/Signup/Signup";
import DashboardAdmin from "./components/admin/DashboardAdmin";
import Certificaciones from "./components/modules/Certificaciones";
import Evidencias from "./components/modules/Evidencias";
import ReportesMetricas from "./components/modules/ReportesMetricas";
import Expedientes from "./components/modules/Expedientes";
import CumplimientoSTPS from "./components/modules/CumplimientoSTPS";
import Usuarios from "./components/modules/Usuarios";

class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/certificaciones" element={<Certificaciones />} />
          <Route path="/evidencias" element={<Evidencias />} />
          <Route path="/reportes-metricas" element={<ReportesMetricas />} />
          <Route path="/expedientes" element={<Expedientes />} />
          <Route path="/cumplimiento-stps" element={<CumplimientoSTPS />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </Router>
    );
  }
}

export default AppRoutes;
