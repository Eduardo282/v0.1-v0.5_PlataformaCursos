import axios from "axios";
import { API } from "../../utils/http/api_graphql";

const signup = async (name, lastname, email, password) => {
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
          mutation signup($name: String!, $lastname: String!, $email: String!, $password: String!) {
            signup(name: $name, lastname: $lastname, email: $email, password: $password) {
              id
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

export default {
  login,
  signup,
};
