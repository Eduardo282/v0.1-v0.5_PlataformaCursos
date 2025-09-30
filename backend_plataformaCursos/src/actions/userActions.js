const client = require("../config/database");
const bcrypt = require("bcryptjs");

// Login function (validar contra tabla de registro y contraseña encriptada)
const login = async ({ name, email, password }) => {
  try {
    // Buscar por nombre y correo en la misma tabla donde se registró
    const [rows] = await client.query(
      "SELECT * FROM admin_signup WHERE email = ? AND name = ? LIMIT 1",
      [email, name]
    );

    if (rows.length === 0) {
      return { message: "Usuario, nombre o contraseña incorrectos" };
    }

    const user = rows[0];

    // Validar password hasheado
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return { message: "Usuario, nombre o contraseña incorrectos" };
    }

    // Éxito: devolver campos esperados por el frontend/GraphQL
    const nowIso = new Date().toISOString();
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname ?? null,
      email: user.email,
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
