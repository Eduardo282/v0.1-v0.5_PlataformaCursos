import axios from "axios";
import { API } from "../../utils/http/api_graphql";

const signup = async (name, lastname, email, id_admin, password) => {
  return new Promise((resolve, reject) => {
    axios({
      url: API,
      method: "post",
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query: `
          mutation signup($name: String!, $lastname: String!, $email: String!, $id_admin: String, $password: String!) {
            signup(name: $name, lastname: $lastname, email: $email, id_admin: $id_admin, password: $password) {
              id
              message
            }
          }`,
        variables: {
          name,
          lastname,
          email,
          id_admin,
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

const login = async (name, email, password) => {
  return new Promise((resolve, reject) => {
    axios({
      url: API,
      method: "post",
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query: `
          query login($name: String!, $email: String!, $password: String!) {
            login(name: $name, email: $email, password: $password) {
              id
              name
              lastname
              email
              id_admin
              active
              current_role
              last_access
              message
            }
          }`,
        variables: {
          name: name,
          email: email,
          password: password,
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

export default {
  login,
  signup,
};
