import axios from "axios";
import { API, axiosInstance } from "../../utils/http/api_graphql";

const signup = async (name, lastname, email, password) => {
  return new Promise((resolve, reject) => {
    // Usar axios directo (sin interceptor) porque aún no hay token
    axios({
      url: API,
      method: "post",
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query: `
          mutation signup($name: String!, $lastname: String!, $email: String!, $password: String!) {
            signup(name: $name, lastname: $lastname, email: $email, password: $password) {
              id
              name
              lastname
              email
              alias
              token
              message
            }
          }`,
        variables: {
          name,
          lastname,
          email,
          password,
        },
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const login = async (email, password, alias = "") => {
  return new Promise((resolve, reject) => {
    // Usar axios directo (sin interceptor) porque aún no hay token
    axios({
      url: API,
      method: "post",
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query: `
          query login($email: String!, $password: String!, $alias: String) {
            login(email: $email, password: $password, alias: $alias) {
              id
              name
              lastname
              email
              alias
              active
              current_role
              last_access
              token
              message
            }
          }`,
        variables: {
          email: email,
          password: password,
          alias: alias,
        },
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Ejemplo de función protegida que usará axiosInstance con token automático
const getProtectedData = async () => {
  return axiosInstance.post("", {
    query: `
      query {
        protectedData {
          id
          data
        }
      }
    `,
  });
};

// Solicitar recuperación de contraseña
const requestPasswordReset = async (email) => {
  return axios({
    url: API,
    method: "post",
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      query: `
        mutation requestPasswordReset($email: String!) {
          requestPasswordReset(email: $email) {
            success
            message
          }
        }
      `,
      variables: { email },
    },
  });
};

// Verificar token de recuperación
const verifyResetToken = async (token) => {
  return axios({
    url: API,
    method: "post",
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      query: `
        query verifyResetToken($token: String!) {
          verifyResetToken(token: $token) {
            valid
            email
            userName
            message
          }
        }
      `,
      variables: { token },
    },
  });
};

// Restablecer contraseña con token
const resetPassword = async (token, newPassword) => {
  return axios({
    url: API,
    method: "post",
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      query: `
        mutation resetPassword($token: String!, $newPassword: String!) {
          resetPassword(token: $token, newPassword: $newPassword) {
            success
            message
          }
        }
      `,
      variables: { token, newPassword },
    },
  });
};

export default {
  login,
  signup,
  getProtectedData,
  requestPasswordReset,
  verifyResetToken,
  resetPassword,
};
