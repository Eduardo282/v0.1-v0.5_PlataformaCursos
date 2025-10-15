const actions = require("../actions/userActions");
const passwordResetActions = require("../actions/passwordResetActions");

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

const requestPasswordReset = async (_, { email }) => {
  try {
    console.log(`[GRAPHQL] 🔵 Recibida solicitud de reset para: ${email}`);
    const result = await passwordResetActions.requestPasswordReset({ email });
    console.log("[GRAPHQL] ✅ Solicitud de reset procesada exitosamente");
    console.log("[GRAPHQL] Resultado:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("[GRAPHQL] ❌ Error en requestPasswordReset:", error);
    console.error("[GRAPHQL] Mensaje de error:", error.message);
    console.error("[GRAPHQL] Stack:", error.stack);
    return {
      success: false,
      message: "Error al procesar solicitud",
    };
  }
};

const resetPassword = async (_, { token, newPassword }) => {
  try {
    const result = await passwordResetActions.resetPasswordWithToken({
      token,
      newPassword,
    });
    console.log("[GRAPHQL] Password reset completado");
    return result;
  } catch (error) {
    console.error("[GRAPHQL] Error en resetPassword:", error);
    return {
      success: false,
      message: "Error al restablecer contraseña",
    };
  }
};

module.exports = {
  signup,
  requestPasswordReset,
  resetPassword,
};
