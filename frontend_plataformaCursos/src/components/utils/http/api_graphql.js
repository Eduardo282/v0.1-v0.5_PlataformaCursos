import axios from "axios";
import { getToken } from "../../../services/authService.js";

const API = "http://localhost:8000/graphql";

// Crear instancia de axios configurada
const axiosInstance = axios.create({
  baseURL: API,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token JWT automáticamente a cada petición
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      // Agregar token al header Authorization en formato Bearer
      config.headers.Authorization = `Bearer ${token}`;
      console.log("[API] Token JWT agregado a la petición");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el error es 401 (no autorizado), redirigir al login
    if (error.response?.status === 401) {
      console.error("[API] Error 401: No autorizado. Redirigiendo al login...");
      localStorage.clear(); // Limpiar todo el localStorage
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export { API, axiosInstance };
