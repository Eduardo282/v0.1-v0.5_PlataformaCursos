/**
 * 🧪 SCRIPT DE PRUEBA RÁPIDA DE EMAIL
 *
 * Este script verifica que Resend esté configurado correctamente
 * y pueda enviar emails.
 */

require("dotenv").config();
const { Resend } = require("resend");

console.log("\n🧪 INICIANDO TEST DE EMAIL CON RESEND\n");
console.log("=".repeat(50));

// 1. Verificar variables de entorno
console.log("\n📋 1. VERIFICANDO CONFIGURACIÓN:");
console.log(
  `   RESEND_API_KEY: ${
    process.env.RESEND_API_KEY ? "✅ Configurada" : "❌ NO CONFIGURADA"
  }`
);
console.log(
  `   FROM_EMAIL: ${process.env.FROM_EMAIL || "onboarding@resend.dev"}`
);
console.log(
  `   FRONTEND_URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`
);

if (!process.env.RESEND_API_KEY) {
  console.error("\n❌ ERROR: RESEND_API_KEY no está configurada en .env");
  console.error("   → Crea tu API Key en: https://resend.com/api-keys");
  process.exit(1);
}

// 2. Inicializar Resend
console.log("\n🔧 2. INICIALIZANDO RESEND...");
const resend = new Resend(process.env.RESEND_API_KEY);
console.log("   ✅ Resend inicializado correctamente");

// 3. Enviar email de prueba
console.log("\n📧 3. ENVIANDO EMAIL DE PRUEBA...");

const testEmail = async () => {
  try {
    const { data, error } = await resend.emails.send({
      from: `Plataforma de Cursos <${
        process.env.FROM_EMAIL || "onboarding@resend.dev"
      }>`,
      to: "eduardo.francisco@alumno.buap.mx", // ← CAMBIA ESTO A TU EMAIL REAL
      subject: "🧪 Test de Email - Plataforma de Cursos",
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
              margin: 50px auto; 
              background: white;
              border-radius: 8px;
              padding: 40px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .success { 
              background: #10b981; 
              color: white; 
              padding: 20px; 
              border-radius: 8px; 
              text-align: center;
              margin-bottom: 20px;
            }
            .info {
              background: #f0f9ff;
              border-left: 4px solid #3b82f6;
              padding: 15px;
              margin: 20px 0;
            }
            .code {
              background: #f3f4f6;
              padding: 10px;
              border-radius: 4px;
              font-family: monospace;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success">
              <h1 style="margin: 0;">✅ ¡Email Funcionando!</h1>
            </div>
            
            <h2>🎉 ¡Resend está configurado correctamente!</h2>
            
            <p>Si estás leyendo este email, significa que:</p>
            
            <ul>
              <li>✅ Tu API Key de Resend es válida</li>
              <li>✅ El servicio de email está funcionando</li>
              <li>✅ La configuración del backend es correcta</li>
              <li>✅ Los emails pueden enviarse sin problemas</li>
            </ul>
            
            <div class="info">
              <strong>📅 Fecha del test:</strong> ${new Date().toLocaleString(
                "es-ES"
              )}<br>
              <strong>📧 Remitente:</strong> ${
                process.env.FROM_EMAIL || "onboarding@resend.dev"
              }
            </div>
            
            <h3>🚀 Siguiente paso:</h3>
            <p>Ahora puedes probar la funcionalidad "Olvidé mi contraseña" desde tu aplicación.</p>
            
            <div class="code">
              <strong>Comando ejecutado:</strong><br>
              node test-email.js
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <p style="color: #6b7280; font-size: 14px; text-align: center;">
              Este es un email de prueba automático de Plataforma de Cursos
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
¡Email de prueba!

Si estás leyendo este email, significa que Resend está configurado correctamente.

Fecha: ${new Date().toLocaleString("es-ES")}
Remitente: ${process.env.FROM_EMAIL || "onboarding@resend.dev"}

Ahora puedes probar la funcionalidad "Olvidé mi contraseña" desde tu aplicación.
      `,
    });

    if (error) {
      console.error("\n❌ ERROR AL ENVIAR EMAIL:");
      console.error("   Mensaje:", error.message);
      console.error("   Detalles:", JSON.stringify(error, null, 2));

      // Diagnóstico del error
      console.log("\n🔍 DIAGNÓSTICO:");
      if (error.message.includes("API key")) {
        console.log("   → Problema con la API Key");
        console.log("   → Verifica que sea correcta en .env");
        console.log('   → Debe empezar con "re_"');
      } else if (error.message.includes("email")) {
        console.log("   → Problema con el email destinatario");
        console.log("   → Verifica que sea un email válido");
      } else if (error.message.includes("from")) {
        console.log("   → Problema con el email remitente");
        console.log("   → Usa: onboarding@resend.dev");
      }

      process.exit(1);
    }

    console.log("\n✅ EMAIL ENVIADO EXITOSAMENTE!");
    console.log("   ID del mensaje:", data.id);
    console.log("   Detalles:", JSON.stringify(data, null, 2));

    console.log("\n📬 REVISA TU BANDEJA DE ENTRADA:");
    console.log("   → Si no lo ves, revisa SPAM");
    console.log("   → El email viene de: Plataforma de Cursos");
    console.log("   → Puede tardar unos segundos en llegar");

    console.log("\n🎉 ¡TODO FUNCIONANDO CORRECTAMENTE!");
    console.log('   Ahora puedes usar "Olvidé mi contraseña" sin problemas\n');

    console.log("=".repeat(50));
  } catch (error) {
    console.error("\n❌ ERROR CRÍTICO:");
    console.error("   Mensaje:", error.message);
    console.error("   Stack:", error.stack);

    console.log("\n💡 POSIBLES SOLUCIONES:");
    console.log("   1. Verifica tu API Key en .env");
    console.log(
      '   2. Asegúrate de tener instalado "resend": npm install resend'
    );
    console.log("   3. Verifica tu conexión a internet");
    console.log("   4. Crea una nueva API Key en: https://resend.com/api-keys");

    process.exit(1);
  }
};

// Ejecutar test
testEmail();
