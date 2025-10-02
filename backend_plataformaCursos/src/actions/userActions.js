const client = require("../config/database");
const bcrypt = require("bcryptjs");

// Login function (validar contra tabla de registro y contraseña encriptada)
const login = async ({ email, password, alias }) => {
  try {
    // Buscar solo por email en la tabla donde se registró
    const [rows] = await client.query(
      "SELECT * FROM admin_signup WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return { message: "Email o contraseña incorrectos" };
    }

    const user = rows[0];

    // Validar password hasheado
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return { message: "Email o contraseña incorrectos" };
    }

    // Éxito: devolver campos esperados por el frontend/GraphQL
    // Si el usuario proporciona un alias, úsalo; de lo contrario, usa el nombre del signup
    const displayName = alias && alias.trim() !== "" ? alias : user.name;
    const nowIso = new Date().toISOString();

    return {
      id: user.id,
      name: user.name, // Nombre original del signup (para fallback)
      lastname: user.lastname ?? null,
      email: user.email,
      alias: displayName, // Alias preferido o nombre del signup
      active: 1,
      current_role: "admin",
      last_access: nowIso,
      message: "Inicio de sesion exitoso",
    };
  } catch (err) {
    console.error("[LOGIN] Error en la base de datos:", err);
    return { message: "Error en la base de datos", error: err };
  }
};

//la estructura correcta es la de abel
const signup = ({ name, lastname, email, password }) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, contrasenaHasheada) => {
      if (err) return reject(err);

      // id_admin eliminado del insert y del esquema
      const query = `INSERT INTO admin_signup(name, lastname, email, password, confirm_password) VALUES (?, ?, ?, ?, ?)`;
      const values = [
        name,
        lastname,
        email,
        contrasenaHasheada,
        contrasenaHasheada,
      ];

      client
        .query(query, values)
        .then(([result]) => {
          resolve({
            id: result.insertId.toString(),
            message: "Registro exitoso",
          });
        })
        .catch((error) => {
          console.error("Error en signup:", error);
          reject(new Error("No se pudo registrar el usuario"));
        });
    });
  });
};

module.exports = {
  login,
  signup,
};
