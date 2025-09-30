const actions = require("../actions/userActions");

const signup = async (_, { name, lastname, email, password }) => {
  try {
    const signup_data = await actions.signup({
      name,
      lastname,
      email,
      password,
    });
    console.log("[GRAPHQL] Respuesta enviada al frontend:", signup_data);
    return signup_data;
  } catch (error) {
    // Devuelve un objeto con el mensaje de error para que el frontend lo reciba
    console.log("[GRAPHQL] Error enviado al frontend:", error);
    return { message: error.message || "Error en el registro", id: null };
  }
};

module.exports = {
  signup,
};
