const client = require("../config/database");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const {
  sendPasswordResetEmail,
  sendPasswordChangedConfirmation,
} = require("../services/emailService");

/**
 * Solicitar recuperación de contraseña
 * Genera token y envía email
 */
const requestPasswordReset = async ({ email }) => {
  try {
    console.log(`\n🔍 [PASSWORD_RESET] ========== INICIO ==========`);
    console.log(`[PASSWORD_RESET] 📧 Email recibido: "${email}"`);

    // 1. Verificar que el usuario existe
    console.log(`[PASSWORD_RESET] 🔎 Buscando usuario en BD...`);
    const [users] = await client.query(
      "SELECT id, name, email FROM admin_signup WHERE email = ? LIMIT 1",
      [email]
    );

    console.log(`[PASSWORD_RESET] 📊 Usuarios encontrados: ${users.length}`);

    if (users.length === 0) {
      console.log(`⚠️  [PASSWORD_RESET] Usuario NO encontrado en BD`);
      console.log(`[PASSWORD_RESET] Retornando mensaje genérico por seguridad`);
      // Por seguridad, no revelar si el email existe o no
      return {
        message: "Si el correo existe, recibirás un enlace de recuperación",
        success: true,
      };
    }

    const user = users[0];
    console.log(`✅ [PASSWORD_RESET] Usuario encontrado:`, {
      id: user.id,
      name: user.name,
      email: user.email,
    });

    // 2. Generar token único y seguro (32 bytes = 64 caracteres hex)
    const resetToken = crypto.randomBytes(32).toString("hex");

    // 3. Calcular fecha de expiración (1 hora desde ahora)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // 4. Guardar token en base de datos
    await client.query(
      `INSERT INTO password_reset_tokens (user_id, email, token, expires_at)
       VALUES (?, ?, ?, ?)`,
      [user.id, user.email, resetToken, expiresAt]
    );

    // 5. Enviar email con el token
    console.log(`[PASSWORD_RESET] 📧 Intentando enviar email a: ${user.email}`);
    console.log(
      `[PASSWORD_RESET] 🔑 Token generado: ${resetToken.substring(0, 10)}...`
    );

    try {
      const emailResult = await sendPasswordResetEmail(
        user.email,
        resetToken,
        user.name
      );
      console.log(
        `✅ [PASSWORD_RESET] Email enviado exitosamente a ${user.email}`
      );
      console.log(`[PASSWORD_RESET] ID del mensaje: ${emailResult.messageId}`);
    } catch (emailError) {
      console.error("❌ [PASSWORD_RESET] Error al enviar email:", emailError);
      console.error("[PASSWORD_RESET] Detalles del error:", emailError.message);
      console.error("[PASSWORD_RESET] Stack:", emailError.stack);
      // No fallar la operación, pero registrar el error
    }

    console.log(`[PASSWORD_RESET] ========== FIN ==========\n`);

    return {
      message: "Si el correo existe, recibirás un enlace de recuperación",
      success: true,
    };
  } catch (error) {
    console.error(
      "❌ [PASSWORD_RESET] Error crítico en requestPasswordReset:",
      error
    );
    console.error("[PASSWORD_RESET] Mensaje:", error.message);
    console.error("[PASSWORD_RESET] Stack:", error.stack);
    throw new Error("Error al procesar solicitud de recuperación");
  }
};

/**
 * Verificar si un token es válido
 */
const verifyResetToken = async ({ token }) => {
  try {
    const [tokens] = await client.query(
      `SELECT t.id, t.user_id, t.email, t.expires_at, t.used, u.name
       FROM password_reset_tokens t
       JOIN admin_signup u ON t.user_id = u.id
       WHERE t.token = ? AND t.used = FALSE
       LIMIT 1`,
      [token]
    );

    if (tokens.length === 0) {
      return {
        valid: false,
        message: "Token inválido o ya utilizado",
      };
    }

    const tokenData = tokens[0];
    const now = new Date();
    const expiresAt = new Date(tokenData.expires_at);

    if (now > expiresAt) {
      return {
        valid: false,
        message: "El token ha expirado. Solicita uno nuevo.",
      };
    }

    return {
      valid: true,
      email: tokenData.email,
      userName: tokenData.name,
      message: "Token válido",
    };
  } catch (error) {
    console.error("[PASSWORD_RESET] Error en verifyResetToken:", error);
    throw new Error("Error al verificar token");
  }
};

/**
 * Restablecer contraseña con token válido
 */
const resetPasswordWithToken = async ({ token, newPassword }) => {
  try {
    // 1. Verificar que el token es válido
    const verification = await verifyResetToken({ token });

    if (!verification.valid) {
      return {
        success: false,
        message: verification.message,
      };
    }

    // 2. Obtener datos del token
    const [tokens] = await client.query(
      `SELECT t.id, t.user_id, t.email
       FROM password_reset_tokens t
       WHERE t.token = ? AND t.used = FALSE
       LIMIT 1`,
      [token]
    );

    if (tokens.length === 0) {
      return {
        success: false,
        message: "Token inválido",
      };
    }

    const tokenData = tokens[0];

    // 3. Encriptar nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Actualizar contraseña en la base de datos
    await client.query(
      `UPDATE admin_signup 
       SET password = ?, confirm_password = ?
       WHERE id = ?`,
      [hashedPassword, hashedPassword, tokenData.user_id]
    );

    // 5. Marcar token como usado para que no se pueda reutilizar
    await client.query(
      `UPDATE password_reset_tokens 
       SET used = TRUE 
       WHERE id = ?`,
      [tokenData.id]
    );

    // 6. Invalidar todos los otros tokens del usuario (opcional pero recomendado)
    await client.query(
      `UPDATE password_reset_tokens 
       SET used = TRUE 
       WHERE user_id = ? AND id != ?`,
      [tokenData.user_id, tokenData.id]
    );

    // 7. Enviar email de confirmación
    try {
      await sendPasswordChangedConfirmation(
        tokenData.email,
        verification.userName
      );
    } catch (emailError) {
      console.error(
        "[PASSWORD_RESET] Error al enviar confirmación:",
        emailError
      );
    }

    console.log(
      `[PASSWORD_RESET] Contraseña actualizada para user_id: ${tokenData.user_id}`
    );

    return {
      success: true,
      message: "Contraseña actualizada exitosamente",
    };
  } catch (error) {
    console.error("[PASSWORD_RESET] Error en resetPasswordWithToken:", error);
    throw new Error("Error al restablecer contraseña");
  }
};

/**
 * Limpiar tokens expirados (ejecutar periódicamente con cron job)
 */
const cleanupExpiredTokens = async () => {
  try {
    const [result] = await client.query(
      `DELETE FROM password_reset_tokens 
       WHERE expires_at < NOW() OR used = TRUE`
    );

    console.log(
      `[PASSWORD_RESET] Limpieza: ${result.affectedRows} tokens eliminados`
    );
    return {
      deleted: result.affectedRows,
      message: "Tokens expirados eliminados",
    };
  } catch (error) {
    console.error("[PASSWORD_RESET] Error en cleanupExpiredTokens:", error);
    throw new Error("Error al limpiar tokens");
  }
};

module.exports = {
  requestPasswordReset,
  verifyResetToken,
  resetPasswordWithToken,
  cleanupExpiredTokens,
};
