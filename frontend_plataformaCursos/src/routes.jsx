import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/admin/Login/Login";
import Signup from "./components/admin/Signup/Signup";
import ResetPassword from "./components/ResetPassword";
import DashboardAdmin from "./components/admin/DashboardAdmin";
import Certificaciones from "./components/modules/Certificaciones";
import Evidencias from "./components/modules/Evidencias";
import ReportesMetricas from "./components/modules/ReportesMetricas";
import Expedientes from "./components/modules/Expedientes";
import CumplimientoSTPS from "./components/modules/CumplimientoSTPS";
import Usuarios from "./components/modules/Usuarios";
import ProtectedRoute from "./components/ProtectedRoute";

class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* Ruta raíz - redirige a login por defecto */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Rutas públicas (sin autenticación) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Rutas protegidas (requieren autenticación con JWT) */}
          <Route
            path="/dashboardAdmin"
            element={
              <ProtectedRoute>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificaciones"
            element={
              <ProtectedRoute>
                <Certificaciones />
              </ProtectedRoute>
            }
          />
          <Route
            path="/evidencias"
            element={
              <ProtectedRoute>
                <Evidencias />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reportes-metricas"
            element={
              <ProtectedRoute>
                <ReportesMetricas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expedientes"
            element={
              <ProtectedRoute>
                <Expedientes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cumplimiento-stps"
            element={
              <ProtectedRoute>
                <CumplimientoSTPS />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute>
                <Usuarios />
              </ProtectedRoute>
            }
          />

          {/* Ruta 404 - cualquier ruta no encontrada redirige a login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }
}

export default AppRoutes;
