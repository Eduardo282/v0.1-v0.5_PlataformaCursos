const { Resend } = require("resend");

/**
 * ========================================
 * CONFIGURACIÓN DE EMAIL CON RESEND
 * ========================================
 *
 * PASO 1: Crear cuenta en Resend (GRATIS)
 * → Ve a: https://resend.com/signup
 * → Regístrate con tu email
 * → Sin tarjeta de crédito requerida
 * → 3,000 emails gratis al mes
 *
 * PASO 2: Obtener API Key
 * → Dashboard → API Keys
 * → Click "Create API Key"
 * → Nombre: "Plataforma Cursos"
 * → Copia la key que empieza con "re_"
 *
 * PASO 3: Configurar .env
 * → Agrega: RESEND_API_KEY=re_tu_api_key_aqui
 *
 * PASO 4 (OPCIONAL): Agregar dominio propio
 * → Dashboard → Domains → Add Domain
 * → Si no tienes dominio, usa: onboarding@resend.dev
 */

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Email por defecto (usar onboarding@resend.dev si no tienes dominio)
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

// Verificar configuración al iniciar
if (!process.env.RESEND_API_KEY) {
  console.warn("⚠️  [EMAIL] RESEND_API_KEY no está configurada en .env");
  console.warn("→  Obtén tu API key en: https://resend.com/api-keys");
} else {
  console.log("✅ [EMAIL] Servicio de email Resend configurado correctamente");
}

/**
 * Envía email de recuperación de contraseña
 * @param {string} to - Email del destinatario
 * @param {string} resetToken - Token de recuperación
 * @param {string} userName - Nombre del usuario
 * @returns {Promise<Object>} Resultado del envío
 */
const sendPasswordResetEmail = async (to, resetToken, userName) => {
  const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
  const resetURL = `${frontendURL}/reset-password?token=${resetToken}`;

  console.log(`[EMAIL] 🚀 Iniciando envío de email...`);
  console.log(`[EMAIL] 📧 Destinatario: ${to}`);
  console.log(`[EMAIL] 👤 Nombre: ${userName}`);
  console.log(`[EMAIL] 🔗 URL de reset: ${resetURL}`);
  console.log(`[EMAIL] 📨 Remitente: ${FROM_EMAIL}`);

  try {
    const { data, error } = await resend.emails.send({
      from: `Plataforma de Cursos <${FROM_EMAIL}>`,
      to: to,
      subject: "🔐 Recuperación de Contraseña - Plataforma de Cursos",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          }
          .header {
            background: rgba(255,255,255,0.1);
            padding: 40px 30px;
            text-align: center;
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }
          .header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .content {
            background: white;
            padding: 40px 30px;
          }
          .greeting {
            font-size: 20px;
            color: #667eea;
            margin-bottom: 20px;
            font-weight: 600;
          }
          .message {
            color: #555;
            margin-bottom: 30px;
            font-size: 16px;
          }
          .button-container {
            text-align: center;
            margin: 40px 0;
          }
          .reset-button {
            display: inline-block;
            padding: 16px 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white !important;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          }
          .info-box {
            background: #f8f9ff;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 30px 0;
            border-radius: 8px;
          }
          .info-box p {
            margin: 0;
            color: #555;
            font-size: 14px;
          }
          .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
            font-size: 14px;
            color: #856404;
          }
          .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #6c757d;
            font-size: 13px;
          }
          .footer a {
            color: #667eea;
            text-decoration: none;
          }
          .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #e0e0e0, transparent);
            margin: 30px 0;
          }
          .link-box {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 8px;
            word-break: break-all;
            font-size: 13px;
            color: #667eea;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Recuperación de Contraseña</h1>
          </div>
          
          <div class="content">
            <p class="greeting">Hola ${userName || "Usuario"},</p>
            
            <p class="message">
              Recibimos una solicitud para restablecer la contraseña de tu cuenta en 
              <strong>Plataforma de Cursos</strong>.
            </p>
            
            <p class="message">
              Si fuiste tú quien solicitó este cambio, haz clic en el botón de abajo 
              para crear una nueva contraseña:
            </p>
            
            <div class="button-container">
              <a href="${resetURL}" class="reset-button">
                Restablecer Contraseña
              </a>
            </div>
            
            <div class="info-box">
              <p>
                <strong>⏰ Este enlace expirará en 1 hora</strong><br>
                Por seguridad, el enlace solo puede usarse una vez.
              </p>
            </div>
            
            <div class="divider"></div>
            
            <p style="color: #666; font-size: 14px;">
              Si el botón no funciona, copia y pega este enlace en tu navegador:
            </p>
            <div class="link-box">
              ${resetURL}
            </div>
            
            <div class="warning">
              ⚠️ <strong>¿No solicitaste este cambio?</strong><br>
              Si no fuiste tú, ignora este correo. Tu contraseña permanecerá sin cambios 
              y tu cuenta estará segura.
            </div>
          </div>
          
          <div class="footer">
            <p>
              Este es un correo automático, por favor no respondas.<br>
              Si tienes problemas, contacta a 
              <a href="mailto:soporte@plataformacursos.com">soporte@plataformacursos.com</a>
            </p>
            <p style="margin-top: 20px; color: #999;">
              © ${new Date().getFullYear()} Plataforma de Cursos. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
      // Versión texto plano (fallback)
      text: `
Hola ${userName || "Usuario"},

Recibimos una solicitud para restablecer tu contraseña.

Para crear una nueva contraseña, visita este enlace:
${resetURL}

Este enlace expirará en 1 hora por razones de seguridad.

Si no solicitaste este cambio, puedes ignorar este correo de forma segura.

Saludos,
Equipo de Plataforma de Cursos
      `,
    });

    if (error) {
      console.error("❌ [EMAIL] Error al enviar email con Resend:", error);
      console.error("[EMAIL] Mensaje de error:", error.message);
      console.error(
        "[EMAIL] Detalles completos:",
        JSON.stringify(error, null, 2)
      );
      throw new Error(`Error de Resend: ${error.message}`);
    }

    console.log("✅ [EMAIL] Email de recuperación enviado exitosamente!");
    console.log(`[EMAIL] ID del mensaje: ${data.id}`);
    console.log("[EMAIL] Detalles:", JSON.stringify(data, null, 2));

    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("❌ [EMAIL] Error crítico al enviar email:", error);
    console.error("[EMAIL] Mensaje:", error.message);
    console.error("[EMAIL] Stack:", error.stack);
    throw new Error("No se pudo enviar el email de recuperación");
  }
};

/**
 * Envía email de confirmación de cambio de contraseña
 * @param {string} to - Email del destinatario
 * @param {string} userName - Nombre del usuario
 * @returns {Promise<Object>} Resultado del envío
 */
const sendPasswordChangedConfirmation = async (to, userName) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `Plataforma de Cursos <${FROM_EMAIL}>`,
      to: to,
      subject: "✅ Tu contraseña ha sido actualizada",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 30px auto; 
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
          }
          .content { 
            padding: 40px 30px; 
          }
          .success-icon { 
            font-size: 48px; 
            margin-bottom: 10px; 
          }
          .warning-box { 
            background: #fef3c7; 
            border-left: 4px solid #f59e0b; 
            padding: 15px; 
            margin: 20px 0; 
            border-radius: 4px;
          }
          .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #6c757d;
            font-size: 13px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">✅</div>
            <h1 style="margin: 0;">Contraseña Actualizada</h1>
          </div>
          <div class="content">
            <p>Hola ${userName || "Usuario"},</p>
            <p>Te confirmamos que tu contraseña ha sido <strong>actualizada exitosamente</strong>.</p>
            <p>Ahora puedes iniciar sesión con tu nueva contraseña en:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${
                process.env.FRONTEND_URL || "http://localhost:5173"
              }/login" 
                 style="display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Iniciar Sesión
              </a>
            </p>
            <div class="warning-box">
              <strong>⚠️ ¿No fuiste tú?</strong><br>
              Si no realizaste este cambio, contacta inmediatamente a nuestro equipo de soporte.
            </div>
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              <strong>Fecha:</strong> ${new Date().toLocaleString("es-ES", {
                timeZone: "America/Mexico_City",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Plataforma de Cursos. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `,
      text: `
Hola ${userName},

Tu contraseña ha sido actualizada exitosamente en ${new Date().toLocaleString(
        "es-ES"
      )}.

Si no fuiste tú, contacta a soporte inmediatamente.

Saludos,
Equipo de Plataforma de Cursos
      `,
    });

    if (error) {
      console.error("[EMAIL] Error al enviar confirmación con Resend:", error);
      throw new Error(`Error de Resend: ${error.message}`);
    }

    console.log("✅ [EMAIL] Email de confirmación enviado:", data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("[EMAIL] Error al enviar confirmación:", error);
    throw new Error("No se pudo enviar el email de confirmación");
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendPasswordChangedConfirmation,
};
