# 📧 TODAS LAS ALTERNATIVAS PARA ENVIAR EMAILS

## 🎯 RESUMEN RÁPIDO

| Servicio               | Gratis              | Fácil        | Sin Tarjeta | Recomendado            |
| ---------------------- | ------------------- | ------------ | ----------- | ---------------------- |
| **Resend** ⭐          | 3,000/mes           | ✅ Muy fácil | ✅          | ✅ **Mejor opción**    |
| **Brevo (Sendinblue)** | 300/día             | ✅ Fácil     | ✅          | ✅ Buena alternativa   |
| **Mailgun**            | 5,000/mes (3 meses) | ⚠️ Medio     | ❌          | ⚠️ Requiere tarjeta    |
| **SendGrid**           | 100/día             | ⚠️ Medio     | ❌          | ⚠️ Requiere tarjeta    |
| **Gmail SMTP**         | ~500/día            | ❌ Difícil   | ✅          | ❌ Ya no funciona bien |
| **Outlook SMTP**       | ~500/día            | ⚠️ Medio     | ✅          | ⚠️ Puede bloquearte    |

---

## 🥇 OPCIÓN 1: RESEND (LA MEJOR) ⭐

**Ya está configurado en tu proyecto** ✅

### **Ventajas:**

- ✅ 3,000 emails gratis al mes
- ✅ Sin tarjeta de crédito
- ✅ Configuración en 5 minutos
- ✅ API súper simple
- ✅ Mejor entregabilidad

### **Sigue la guía:** `CONFIGURAR_EMAIL_RESEND.md`

---

## 🥈 OPCIÓN 2: BREVO (SENDINBLUE)

Si Resend no te funciona, esta es la **segunda mejor opción**.

### **Ventajas:**

- ✅ **300 emails al día gratis** (9,000/mes)
- ✅ Sin tarjeta de crédito
- ✅ Interfaz en español
- ✅ Panel con estadísticas

### **Paso 1: Crear cuenta**

1. Ve a: https://www.brevo.com/es/
2. Click "Regístrate gratis"
3. Completa el formulario
4. Verifica tu email

### **Paso 2: Obtener SMTP credentials**

1. Ve a: https://app.brevo.com/settings/keys/smtp
2. Copia:
   - **SMTP Server:** `smtp-relay.brevo.com`
   - **Port:** `587`
   - **Login:** Tu email de registro
   - **SMTP Key:** Click "Generate" y copia la key

### **Paso 3: Instalar nodemailer (ya lo tienes)**

```bash
npm install nodemailer
```

### **Paso 4: Modificar `emailService.js`**

```javascript
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true para port 465, false para otros
  auth: {
    user: process.env.BREVO_LOGIN, // Tu email de Brevo
    pass: process.env.BREVO_SMTP_KEY, // Tu SMTP Key
  },
});

// Resto del código igual...
```

### **Paso 5: Actualizar `.env`**

```env
BREVO_LOGIN=tu_email@ejemplo.com
BREVO_SMTP_KEY=tu_smtp_key_de_brevo
FROM_EMAIL=tu_email@ejemplo.com
```

### **Paso 6: Probar**

```bash
nodemon index.js
```

---

## 🥉 OPCIÓN 3: MAILGUN

**Requiere tarjeta de crédito** pero no te cobran nada (5,000 emails gratis por 3 meses).

### **Ventajas:**

- ✅ 5,000 emails/mes gratis por 3 meses
- ✅ API muy robusta
- ✅ Usado por grandes empresas

### **Desventajas:**

- ❌ Requiere tarjeta de crédito (aunque no te cobran)
- ❌ Más complicado de configurar

### **Configuración:**

1. **Crear cuenta:** https://signup.mailgun.com/
2. **Verificar dominio** (o usa sandbox para testing)
3. **Obtener API key** del dashboard
4. **Instalar:** `npm install mailgun.js form-data`
5. **Modificar `emailService.js`:**

```javascript
const formData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendPasswordResetEmail = async (to, resetToken, userName) => {
  const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const data = {
    from: "Plataforma Cursos <noreply@sandbox123.mailgun.org>",
    to: to,
    subject: "🔐 Recuperación de Contraseña",
    html: `...`, // Tu HTML aquí
  };

  await mg.messages.create("sandbox123.mailgun.org", data);
};
```

---

## 🔧 OPCIÓN 4: SENDGRID

Similar a Mailgun, pero con 100 emails gratis al día.

### **Ventajas:**

- ✅ 100 emails/día gratis
- ✅ API simple
- ✅ Buen soporte

### **Desventajas:**

- ❌ Requiere tarjeta de crédito
- ❌ Solo 100 emails/día (puede ser poco)

### **Configuración:**

1. **Crear cuenta:** https://signup.sendgrid.com/
2. **Verificar email**
3. **Crear API Key:** Settings → API Keys
4. **Instalar:** `npm install @sendgrid/mail`
5. **Modificar `emailService.js`:**

```javascript
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendPasswordResetEmail = async (to, resetToken, userName) => {
  const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const msg = {
    to: to,
    from: "noreply@tudominio.com", // Debe ser email verificado
    subject: "🔐 Recuperación de Contraseña",
    html: `...`, // Tu HTML aquí
  };

  await sgMail.send(msg);
};
```

---

## 📧 OPCIÓN 5: OUTLOOK/HOTMAIL SMTP

Alternativa gratuita si tienes Outlook.

### **Ventajas:**

- ✅ Completamente gratis
- ✅ Sin límites estrictos
- ✅ No requiere tarjeta

### **Desventajas:**

- ⚠️ Puede bloquearte si envías muchos emails
- ⚠️ Menos confiable que servicios profesionales

### **Configuración:**

```javascript
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.OUTLOOK_EMAIL, // tu_email@outlook.com
    pass: process.env.OUTLOOK_PASSWORD, // Tu contraseña normal
  },
  tls: {
    ciphers: "SSLv3",
  },
});

// Resto igual...
```

**.env:**

```env
OUTLOOK_EMAIL=tu_email@outlook.com
OUTLOOK_PASSWORD=tu_contraseña
FROM_EMAIL=tu_email@outlook.com
```

---

## 🚨 OPCIÓN 6: MAILTRAP (SOLO DESARROLLO)

**Solo para testing**, no envía emails reales.

### **Ventajas:**

- ✅ Perfecto para desarrollo
- ✅ No necesitas configurar nada del destinatario
- ✅ Interfaz para ver los emails

### **Desventajas:**

- ❌ NO envía emails reales (solo los atrapa)

### **Uso:**

1. Ve a: https://mailtrap.io/
2. Regístrate gratis
3. Copia las credenciales SMTP
4. Usa nodemailer con esas credenciales

**Perfecto para probar el diseño de tus emails sin enviarlos realmente.**

---

## 🏆 MI RECOMENDACIÓN FINAL

### **Para Desarrollo:**

1. **Resend** (opción 1) - La más fácil y mejor ⭐⭐⭐⭐⭐
2. **Brevo** (opción 2) - Buena alternativa ⭐⭐⭐⭐
3. **Mailtrap** (opción 6) - Solo para testing ⭐⭐⭐

### **Para Producción:**

1. **Resend** - Mejor relación calidad/precio ⭐⭐⭐⭐⭐
2. **Brevo** - Si necesitas soporte en español ⭐⭐⭐⭐
3. **Mailgun** - Si tu proyecto es muy grande ⭐⭐⭐⭐

---

## 📊 COMPARATIVA DETALLADA

| Característica     | Resend    | Brevo     | Mailgun      | SendGrid  | Outlook   |
| ------------------ | --------- | --------- | ------------ | --------- | --------- |
| **Emails gratis**  | 3,000/mes | 9,000/mes | 5,000/3meses | 3,000/mes | Ilimitado |
| **Sin tarjeta**    | ✅        | ✅        | ❌           | ❌        | ✅        |
| **Fácil setup**    | ✅✅✅    | ✅✅      | ✅           | ✅        | ⚠️        |
| **Entregabilidad** | 99.9%     | 98%       | 99%          | 98%       | 85%       |
| **API moderna**    | ✅        | ⚠️        | ✅           | ✅        | ❌        |
| **Dashboard**      | ✅        | ✅        | ✅           | ✅        | ❌        |
| **Estadísticas**   | ✅        | ✅        | ✅           | ✅        | ❌        |
| **Soporte 24/7**   | ⚠️        | ✅        | ✅           | ✅        | ❌        |
| **Español**        | ❌        | ✅        | ⚠️           | ⚠️        | ✅        |

---

## 🎯 ¿CUÁL ELEGIR?

### **Elige RESEND si:**

- ✅ Quieres la solución más fácil
- ✅ No quieres dar tarjeta de crédito
- ✅ Necesitas buena entregabilidad
- ✅ Tu proyecto es pequeño/mediano (menos de 3,000 emails/mes)

### **Elige BREVO si:**

- ✅ Resend no te funciona
- ✅ Necesitas más emails gratis (9,000/mes)
- ✅ Prefieres interfaz en español
- ✅ Quieres herramientas de marketing adicionales

### **Elige MAILGUN si:**

- ✅ Tu proyecto es muy grande
- ✅ Necesitas features avanzadas
- ✅ No te importa dar tarjeta (aunque no te cobren)
- ✅ Quieres API súper robusta

### **Elige OUTLOOK si:**

- ✅ Solo necesitas algo temporal
- ✅ Envías pocos emails
- ✅ No quieres registrarte en ningún servicio

---

## 📝 NOTAS FINALES

1. **Ya tienes Resend configurado** en tu proyecto ✅
2. Solo necesitas crear cuenta y obtener API key
3. Si tienes problemas con Resend, usa Brevo (opción 2)
4. Para producción SIEMPRE usa un servicio profesional (Resend, Brevo, Mailgun)
5. NUNCA uses Gmail/Outlook para producción (te pueden bloquear)

---

¿Necesitas ayuda configurando alguna de estas opciones? ¡Pregúntame! 😊
