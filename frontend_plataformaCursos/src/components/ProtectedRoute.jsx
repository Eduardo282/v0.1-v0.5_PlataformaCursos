import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getSession } from "../services/authService";

/**
 * Componente que protege rutas requiriendo autenticación
 * Si el usuario no está autenticado, redirige al login
 * Si está autenticado, renderiza el componente hijo
 */
const ProtectedRoute = ({ children }) => {
  // Verificar si hay token válido
  if (!isAuthenticated()) {
    console.log(
      "[ProtectedRoute] Usuario no autenticado, redirigiendo a /login"
    );

    // Redirigir a login si no hay autenticación
    return <Navigate to="/login" replace />;
  }

  const { userData } = getSession();
  console.log("[ProtectedRoute] Usuario autenticado:", userData?.email);

  // Si está autenticado, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;
