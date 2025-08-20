const actions = require("../actions/userActions");

const login = async (_, { name, email, password }) => {
  const user = await actions.login({
    name,
    email,
    password,
  });
  return user;
};

module.exports = {
  login,
};
