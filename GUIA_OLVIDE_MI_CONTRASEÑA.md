# 🔐 GUÍA COMPLETA: CONFIGURACIÓN DE "OLVIDÉ MI CONTRASEÑA"

## 📋 RESUMEN DEL SISTEMA

Sistema completo de recuperación de contraseña con:

- ✅ Generación segura de tokens (crypto)
- ✅ Tokens con expiración (1 hora)
- ✅ Tokens de un solo uso
- ✅ Envío de emails HTML profesionales
- ✅ Validación de tokens en tiempo real
- ✅ Encriptación de contraseñas (bcrypt)
- ✅ Confirmación por email al cambiar contraseña

---

## 🗄️ PASO 1: CREAR TABLA EN MYSQL

Ejecuta el script SQL para crear la tabla de tokens:

```bash
# Opción 1: Desde MySQL Workbench o PHPMyAdmin
# Abre el archivo: backend_plataformaCursos/database/password_reset_table.sql
# Ejecuta todo el contenido

# Opción 2: Desde terminal
mysql -u root -p plataformacursos < backend_plataformaCursos/database/password_reset_table.sql
```

Verifica que la tabla se creó correctamente:

```sql
DESC password_reset_tokens;
SHOW EVENTS LIKE 'cleanup_expired_reset_tokens';
```

---

## 📧 PASO 2: CONFIGURAR GMAIL PARA ENVIAR EMAILS

### **Opción A: Gmail (DESARROLLO)**

1. **Ve a tu cuenta de Google:**

   - Abre: https://myaccount.google.com/security

2. **Activa verificación en dos pasos:**

   - Busca "Verificación en dos pasos"
   - Actívala si no lo está

3. **Genera contraseña de aplicación:**

   - Vuelve a Seguridad
   - Busca "Contraseñas de aplicaciones"
   - Selecciona "Correo" y "Otro dispositivo"
   - Nombra: "Plataforma Cursos"
   - **Copia la contraseña de 16 dígitos** (sin espacios)

4. **Configura el archivo .env:**

```bash
# En backend_plataformaCursos/
cp .env.example .env

# Edita .env y agrega:
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # Los 16 dígitos sin espacios
```

### **Opción B: Resend (PRODUCCIÓN - MÁS FÁCIL)**

Si prefieres usar Resend en lugar de Gmail:

1. Crea cuenta en https://resend.com (gratis: 3,000 emails/mes)
2. Obtén tu API Key
3. Instala: `npm install resend`
4. Usa este código en `emailService.js`:

```javascript
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendPasswordResetEmail = async (to, resetToken, userName) => {
  const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  await resend.emails.send({
    from: "Plataforma de Cursos <onboarding@resend.dev>",
    to: to,
    subject: "🔐 Recuperación de Contraseña",
    html: `...`, // Mismo HTML que ya tienes
  });
};
```

---

## ⚙️ PASO 3: CONFIGURAR VARIABLES DE ENTORNO

Crea el archivo `.env` en `backend_plataformaCursos/`:

```env
# Email
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx

# Frontend URL
FRONTEND_URL=http://localhost:5173

# JWT Secret
JWT_SECRET=tu_clave_super_secreta_cambiar_en_produccion

# Puerto
PORT=8000
```

**IMPORTANTE:** Nunca subas el archivo `.env` a Git (ya está en `.gitignore`)

---

## 🚀 PASO 4: PROBAR EL SISTEMA

### **1. Iniciar servidores:**

Terminal 1 (Backend):

```bash
cd backend_plataformaCursos
nodemon index.js
```

Terminal 2 (Frontend):

```bash
cd frontend_plataformaCursos
npm run dev
```

### **2. Flujo de prueba completo:**

#### **A) Solicitar recuperación de contraseña:**

1. Ve a: http://localhost:5173/login
2. Click en "Olvidé mi contraseña?"
3. Ingresa tu email registrado
4. Click en "Enviar enlace de recuperación"

**Resultado esperado:**

- ✅ Mensaje: "Si el correo existe, recibirás un enlace..."
- ✅ Email enviado a tu bandeja de entrada
- ✅ Token guardado en BD con expiración de 1 hora

#### **B) Verificar email:**

1. Abre tu Gmail
2. Busca el email de "Plataforma de Cursos"
3. Verifica que el email llegó con diseño profesional
4. Verifica que el enlace funciona

#### **C) Restablecer contraseña:**

1. Click en el botón "Restablecer Contraseña" del email
2. Serás redirigido a: http://localhost:5173/reset-password?token=...
3. Ingresa tu nueva contraseña (mínimo 6 caracteres)
4. Confirma la contraseña
5. Click en "Cambiar contraseña"

**Resultado esperado:**

- ✅ Mensaje: "Contraseña actualizada exitosamente"
- ✅ Contraseña actualizada en BD (encriptada con bcrypt)
- ✅ Token marcado como "usado" en BD
- ✅ Email de confirmación enviado
- ✅ Redirect automático a /login después de 3 segundos

#### **D) Iniciar sesión con nueva contraseña:**

1. En /login ingresa tu email y nueva contraseña
2. Click en "Iniciar sesión"

**Resultado esperado:**

- ✅ Login exitoso con la nueva contraseña
- ✅ Redirigido al dashboard

---

## 🔍 PASO 5: VERIFICAR EN BASE DE DATOS

```sql
-- Ver tokens generados
SELECT * FROM password_reset_tokens;

-- Ver solo tokens activos (no usados y no expirados)
SELECT * FROM password_reset_tokens
WHERE used = FALSE AND expires_at > NOW();

-- Ver historial de tokens de un usuario específico
SELECT * FROM password_reset_tokens
WHERE email = 'tu_email@gmail.com'
ORDER BY created_at DESC;
```

---

## 🐛 TROUBLESHOOTING

### **Error: "No se pudo enviar el email"**

**Causa:** Gmail bloqueó el acceso

**Solución:**

1. Verifica que la "Contraseña de aplicación" esté correcta (16 dígitos sin espacios)
2. Asegúrate de tener activada la verificación en dos pasos
3. Revisa la consola del backend para ver el error exacto
4. Prueba enviando un email de prueba manualmente:

```javascript
// En backend, crea test-email.js:
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tu_email@gmail.com",
    pass: "xxxx xxxx xxxx xxxx",
  },
});

transporter
  .sendMail({
    from: "tu_email@gmail.com",
    to: "tu_email@gmail.com",
    subject: "Test",
    text: "Test email",
  })
  .then((info) => {
    console.log("Email enviado:", info.messageId);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Ejecutar: node test-email.js
```

### **Error: "Token inválido o expirado"**

**Causa:** El token ya fue usado o pasó más de 1 hora

**Solución:**

1. Solicita un nuevo enlace de recuperación
2. Usa el nuevo enlace en menos de 1 hora
3. Verifica en BD:

```sql
SELECT token, expires_at, used FROM password_reset_tokens
WHERE email = 'tu_email@gmail.com'
ORDER BY created_at DESC LIMIT 1;
```

### **Error: "Email no llega"**

**Soluciones:**

1. Revisa carpeta de SPAM
2. Verifica que el email esté registrado en admin_signup
3. Revisa logs del backend para ver si se envió
4. Prueba con otro email

---

## 📊 MONITOREO Y MANTENIMIENTO

### **Limpieza automática de tokens:**

La BD limpia automáticamente tokens expirados cada día a las 2 AM.

Para limpiar manualmente:

```sql
DELETE FROM password_reset_tokens
WHERE expires_at < NOW() OR used = TRUE;
```

### **Estadísticas:**

```sql
-- Tokens generados hoy
SELECT COUNT(*) FROM password_reset_tokens
WHERE DATE(created_at) = CURDATE();

-- Tokens usados hoy
SELECT COUNT(*) FROM password_reset_tokens
WHERE DATE(created_at) = CURDATE() AND used = TRUE;

-- Tasa de éxito
SELECT
  COUNT(*) as total,
  SUM(used) as usados,
  (SUM(used) / COUNT(*) * 100) as tasa_exito
FROM password_reset_tokens;
```

---

## 🔒 SEGURIDAD

✅ **Tokens criptográficamente seguros:** crypto.randomBytes(32)
✅ **Expiración de 1 hora:** Tokens se invalidan automáticamente
✅ **Un solo uso:** No se puede reutilizar el mismo token
✅ **No revela si el email existe:** Mismo mensaje siempre
✅ **Contraseñas encriptadas:** bcrypt con salt rounds de 10
✅ **HTTPS en producción:** OBLIGATORIO para enviar tokens
✅ **Rate limiting:** Considera agregar límite de intentos

---

## 🎨 PERSONALIZACIÓN

### **Cambiar tiempo de expiración:**

En `passwordResetActions.js`, línea 26:

```javascript
// 1 hora
const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

// 30 minutos
const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

// 24 horas
const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
```

### **Cambiar diseño del email:**

Edita `emailService.js` en la función `sendPasswordResetEmail`

### **Agregar rate limiting:**

```javascript
// Limitar a 3 intentos por hora
const [attempts] = await client.query(
  `
  SELECT COUNT(*) as count 
  FROM password_reset_tokens 
  WHERE email = ? AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)
`,
  [email]
);

if (attempts[0].count >= 3) {
  return {
    success: false,
    message: "Demasiados intentos. Intenta en 1 hora.",
  };
}
```

---

## ✅ CHECKLIST FINAL

- [ ] Tabla `password_reset_tokens` creada en MySQL
- [ ] Evento automático de limpieza activado
- [ ] Archivo `.env` configurado con EMAIL_USER y EMAIL_PASSWORD
- [ ] Contraseña de aplicación de Gmail generada
- [ ] Backend corriendo sin errores
- [ ] Frontend corriendo sin errores
- [ ] Email de prueba enviado y recibido
- [ ] Token generado correctamente en BD
- [ ] Enlace de recuperación funciona
- [ ] Nueva contraseña se puede establecer
- [ ] Login funciona con nueva contraseña
- [ ] Email de confirmación se recibe

---

## 📚 RECURSOS ADICIONALES

- [Nodemailer Docs](https://nodemailer.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Resend Docs](https://resend.com/docs)
- [JWT Best Practices](https://jwt.io/introduction)

---

## 🆘 SOPORTE

Si tienes problemas:

1. Revisa logs del backend y frontend
2. Verifica la base de datos
3. Prueba el email manualmente
4. Revisa esta guía nuevamente

**¡Listo! Tu sistema de recuperación de contraseña está completamente funcional! 🎉**
