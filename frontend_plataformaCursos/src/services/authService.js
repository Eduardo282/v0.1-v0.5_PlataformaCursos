/**
 * Servicio de autenticación para manejo de tokens JWT en localStorage
 */

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

/**
 * Guarda el token JWT en localStorage
 * @param {string} token - Token JWT recibido del backend
 */
export const saveToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error al guardar token:", error);
  }
};

/**
 * Obtiene el token JWT desde localStorage
 * @returns {string|null} Token JWT o null si no existe
 */
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error al obtener token:", error);
    return null;
  }
};

/**
 * Elimina el token JWT de localStorage
 */
export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error al eliminar token:", error);
  }
};

/**
 * Guarda los datos del usuario en localStorage
 * @param {Object} userData - Datos del usuario
 */
export const saveUserData = (userData) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error("Error al guardar datos de usuario:", error);
  }
};

/**
 * Obtiene los datos del usuario desde localStorage
 * @returns {Object|null} Datos del usuario o null si no existen
 */
export const getUserData = () => {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error al obtener datos de usuario:", error);
    return null;
  }
};

/**
 * Elimina los datos del usuario de localStorage
 */
export const removeUserData = () => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error("Error al eliminar datos de usuario:", error);
  }
};

/**
 * Verifica si el usuario está autenticado (tiene un token válido)
 * @returns {boolean} true si hay token, false si no
 */
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  // Verificar si el token ha expirado
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = payload.exp * 1000; // Convertir a milisegundos
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      // Token expirado, limpiar storage
      logout();
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error al verificar token:", error);
    return false;
  }
};

/**
 * Cierra sesión eliminando token y datos de usuario
 */
export const logout = () => {
  removeToken();
  removeUserData();
};

/**
 * Guarda la sesión completa (token y datos de usuario)
 * @param {string} token - Token JWT
 * @param {Object} userData - Datos del usuario
 */
export const saveSession = (token, userData) => {
  saveToken(token);
  saveUserData(userData);
};

/**
 * Obtiene la sesión completa (token y datos de usuario)
 * @returns {Object} Objeto con token y userData
 */
export const getSession = () => {
  return {
    token: getToken(),
    userData: getUserData(),
  };
};

export default {
  saveToken,
  getToken,
  removeToken,
  saveUserData,
  getUserData,
  removeUserData,
  isAuthenticated,
  logout,
  saveSession,
  getSession,
};
