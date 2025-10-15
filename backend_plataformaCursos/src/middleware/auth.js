const jwt = require("jsonwebtoken");

// CLAVE SECRETA para firmar tokens (EN PRODUCCIÓN usa variables de entorno)
const JWT_SECRET =
  process.env.JWT_SECRET || "tu_clave_super_secreta_cambiar_en_produccion";

/**
 * Genera un token JWT para un usuario
 * @param {Object} user - Datos del usuario (id, email, name, role, etc.)
 * @param {String} expiresIn - Tiempo de expiración (default: 24h)
 * @returns {String} Token JWT firmado
 */
function generateToken(user, expiresIn = "24h") {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    alias: user.alias || user.name,
    role: user.current_role || user.role || "admin",
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verifica y decodifica un token JWT
 * @param {String} token - Token JWT a verificar
 * @returns {Object} Datos del usuario decodificados
 * @throws {Error} Si el token es inválido o ha expirado
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expirado. Por favor inicia sesión nuevamente.");
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("Token inválido. Acceso denegado.");
    }
    throw new Error("Error al verificar token.");
  }
}

/**
 * Middleware para proteger resolvers de GraphQL
 * Extrae el token del header Authorization y lo verifica
 * @param {Function} resolverFunction - Función resolver a proteger
 * @returns {Function} Resolver protegido
 */
function authMiddleware(resolverFunction) {
  return async (parent, args, context, info) => {
    // Extraer token del header Authorization
    const authHeader = context.req?.headers?.authorization;

    if (!authHeader) {
      throw new Error(
        "No se proporcionó token de autenticación. Acceso denegado."
      );
    }

    // El formato esperado es: "Bearer TOKEN_JWT"
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      throw new Error("Formato de token inválido. Use: Bearer <token>");
    }

    try {
      // Verificar y decodificar el token
      const decoded = verifyToken(token);

      // Agregar datos del usuario al contexto para que esté disponible en el resolver
      context.user = decoded;

      // Ejecutar el resolver original con el contexto actualizado
      return resolverFunction(parent, args, context, info);
    } catch (error) {
      throw new Error(`Autenticación fallida: ${error.message}`);
    }
  };
}

/**
 * Middleware opcional que verifica el token pero no falla si no existe
 * Útil para endpoints que funcionan con o sin autenticación
 */
function optionalAuthMiddleware(resolverFunction) {
  return async (parent, args, context, info) => {
    const authHeader = context.req?.headers?.authorization;

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      try {
        const decoded = verifyToken(token);
        context.user = decoded;
      } catch (error) {
        // No hacer nada, el usuario simplemente no estará autenticado
        console.log("Token inválido en optionalAuth:", error.message);
      }
    }

    return resolverFunction(parent, args, context, info);
  };
}

module.exports = {
  generateToken,
  verifyToken,
  authMiddleware,
  optionalAuthMiddleware,
  JWT_SECRET,
};
