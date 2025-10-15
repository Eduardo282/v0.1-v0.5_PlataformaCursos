/**
 * 🔍 SCRIPT PARA VERIFICAR USUARIOS EN LA BASE DE DATOS
 */

require("dotenv").config();
const mysql = require("mysql2/promise");

console.log("\n🔍 VERIFICANDO USUARIOS EN LA BASE DE DATOS\n");
console.log("=".repeat(60));

const verificarUsuarios = async () => {
  let connection;

  try {
    // Conectar a la base de datos
    console.log("\n📊 1. CONECTANDO A LA BASE DE DATOS...");
    connection = await mysql.createConnection({
      host: process.env.HOST || "localhost",
      user: process.env.USER || "root",
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });
    console.log("   ✅ Conectado a:", process.env.DATABASE);

    // Obtener todos los usuarios
    console.log("\n👥 2. CONSULTANDO USUARIOS...");
    const [users] = await connection.query(
      "SELECT id, name, lastname, email, alias FROM admin_signup ORDER BY id DESC LIMIT 10"
    );

    if (users.length === 0) {
      console.log("   ⚠️  NO HAY USUARIOS EN LA BASE DE DATOS");
      console.log("   → Registra al menos un usuario primero");
      return;
    }

    console.log(`   ✅ Usuarios encontrados: ${users.length}\n`);

    console.log("📋 LISTA DE USUARIOS:");
    console.log("-".repeat(60));
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. ID: ${user.id}`);
      console.log(`   Nombre: ${user.name} ${user.lastname || ""}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Alias: ${user.alias || "N/A"}`);
    });

    // Verificar email específico
    console.log("\n" + "=".repeat(60));
    console.log("\n🔎 3. VERIFICANDO EMAIL ESPECÍFICO...");
    const emailBuscado = "eduardo.francisco@alumno.buap.mx";

    const [userEspecifico] = await connection.query(
      "SELECT id, name, email FROM admin_signup WHERE email = ?",
      [emailBuscado]
    );

    if (userEspecifico.length === 0) {
      console.log(`   ❌ Email "${emailBuscado}" NO ENCONTRADO`);
      console.log("\n💡 POSIBLES RAZONES:");
      console.log("   1. El email tiene un typo (espacio extra, punto, etc.)");
      console.log("   2. El usuario fue registrado con otro email");
      console.log("   3. El usuario no está registrado");
      console.log("\n📝 EMAILS SIMILARES EN LA BD:");

      const [similares] = await connection.query(
        "SELECT email FROM admin_signup WHERE email LIKE '%eduardo%' OR email LIKE '%francisco%' OR email LIKE '%buap%'"
      );

      if (similares.length > 0) {
        similares.forEach((user) => {
          console.log(`   - ${user.email}`);
        });
      } else {
        console.log("   (ninguno)");
      }
    } else {
      console.log(`   ✅ Email "${emailBuscado}" ENCONTRADO!`);
      console.log("   Detalles:", userEspecifico[0]);
    }

    // Verificar tabla password_reset_tokens
    console.log("\n" + "=".repeat(60));
    console.log("\n🎫 4. VERIFICANDO TABLA DE TOKENS...");

    try {
      const [tokens] = await connection.query(
        "SELECT * FROM password_reset_tokens ORDER BY created_at DESC LIMIT 5"
      );

      if (tokens.length === 0) {
        console.log("   ℹ️  No hay tokens de reset generados aún");
      } else {
        console.log(`   ✅ Tokens encontrados: ${tokens.length}\n`);
        tokens.forEach((token, index) => {
          console.log(`${index + 1}. Email: ${token.email}`);
          console.log(`   Token: ${token.token.substring(0, 20)}...`);
          console.log(`   Usado: ${token.used ? "Sí" : "No"}`);
          console.log(`   Expira: ${token.expires_at}`);
          console.log(`   Creado: ${token.created_at}\n`);
        });
      }
    } catch (error) {
      console.log("   ⚠️  Tabla password_reset_tokens NO EXISTE");
      console.log(
        "   → Ejecuta: backend_plataformaCursos/database/password_reset_table.sql"
      );
    }

    console.log("=".repeat(60));
    console.log("\n✅ VERIFICACIÓN COMPLETA\n");
  } catch (error) {
    console.error("\n❌ ERROR:", error.message);

    if (error.code === "ECONNREFUSED") {
      console.error("\n💡 SOLUCIÓN:");
      console.error("   → MySQL no está corriendo");
      console.error("   → Inicia MySQL en XAMPP/WAMP/MAMP");
    } else if (error.code === "ER_BAD_DB_ERROR") {
      console.error("\n💡 SOLUCIÓN:");
      console.error(
        `   → La base de datos "${process.env.DATABASE}" no existe`
      );
      console.error("   → Créala en phpMyAdmin");
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("\n💡 SOLUCIÓN:");
      console.error("   → Usuario o contraseña incorrectos en .env");
      console.error("   → Verifica USER y PASSWORD");
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Ejecutar verificación
verificarUsuarios();
