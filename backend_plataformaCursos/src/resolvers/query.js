const actions = require("../actions/userActions");

const login = async (_, { email, password, alias }) => {
  const user = await actions.login({
    email,
    password,
    alias,
  });
  return user;
};

module.exports = {
  login,
};
