const actions = require("../actions/userActions");
const passwordResetActions = require("../actions/passwordResetActions");

const login = async (_, { email, password, alias }) => {
  const user = await actions.login({
    email,
    password,
    alias,
  });
  return user;
};

const verifyResetToken = async (_, { token }) => {
  try {
    const result = await passwordResetActions.verifyResetToken({ token });
    return result;
  } catch (error) {
    console.error("[GRAPHQL] Error en verifyResetToken:", error);
    return {
      valid: false,
      message: "Error al verificar token",
    };
  }
};

module.exports = {
  login,
  verifyResetToken,
};
