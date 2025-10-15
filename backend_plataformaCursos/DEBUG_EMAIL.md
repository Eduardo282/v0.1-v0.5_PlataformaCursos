# 🐛 DEBUG: EMAIL NO LLEGA

## ✅ LO QUE YA VERIFICAMOS:

1. ✅ **Resend funciona correctamente** - El script de prueba envió email exitosamente
2. ✅ **API Key configurada** - RESEND_API_KEY está en .env
3. ✅ **Código actualizado** - emailService.js usa Resend correctamente
4. ✅ **Logs agregados** - Ahora veremos más información

---

## 🔍 SIGUIENTE PASO: PRUEBA CON LOGS

### **1. Reinicia tu backend:**

```bash
cd backend_plataformaCursos
nodemon index.js
```

**Deberías ver:**

```
✅ [EMAIL] Servicio de email Resend configurado correctamente
```

### **2. Desde tu aplicación, solicita "Olvidé mi contraseña":**

1. Ve a: http://localhost:5173/login
2. Click "Olvidé mi contraseña?"
3. Ingresa: `eduardo.francisco@alumno.buap.mx`
4. Click "Enviar"

### **3. Observa la consola del backend, deberías ver:**

```
[GRAPHQL] 🔵 Recibida solicitud de reset para: eduardo.francisco@alumno.buap.mx
[PASSWORD_RESET] 📧 Intentando enviar email a: eduardo.francisco@alumno.buap.mx
[PASSWORD_RESET] 🔑 Token generado: abc123def4...
[EMAIL] 🚀 Iniciando envío de email...
[EMAIL] 📧 Destinatario: eduardo.francisco@alumno.buap.mx
[EMAIL] 👤 Nombre: ferge
[EMAIL] 🔗 URL de reset: http://localhost:5173/reset-password?token=...
[EMAIL] 📨 Remitente: onboarding@resend.dev
✅ [EMAIL] Email de recuperación enviado exitosamente!
[EMAIL] ID del mensaje: xxxxx-xxxxx-xxxxx
✅ [PASSWORD_RESET] Email enviado exitosamente a eduardo.francisco@alumno.buap.mx
[GRAPHQL] ✅ Solicitud de reset procesada exitosamente
```

---

## 🚨 SI VES ERRORES:

### **Error: "Invalid API key"**

```bash
❌ [EMAIL] Error al enviar email con Resend: { message: 'Invalid API key' }
```

**Solución:**

1. Ve a: https://resend.com/api-keys
2. Genera una NUEVA API Key
3. Actualiza tu `.env`:
   ```env
   RESEND_API_KEY=re_nueva_api_key_aqui
   ```
4. Reinicia el backend

---

### **Error: "Recipient email is invalid"**

```bash
❌ [EMAIL] Error: Recipient email is invalid
```

**Solución:**

1. Verifica que el email existe en tu BD:
   ```sql
   SELECT * FROM admin_signup WHERE email = 'eduardo.francisco@alumno.buap.mx';
   ```
2. El email debe ser válido (formato correcto)

---

### **Error: "Daily sending limit reached"**

```bash
❌ [EMAIL] Error: Daily sending limit reached (100 emails/day)
```

**Solución:**

1. Espera 24 horas
2. O crea otra cuenta de Resend
3. O actualiza a plan Pro ($20/mes)

---

### **No hay errores pero el email no llega**

**Posibles causas:**

1. **Email está en SPAM** ✅ **Revisa tu carpeta de SPAM**

2. **Email incorrecto en la BD:**

   ```sql
   -- Verifica el email en la BD
   SELECT id, name, email FROM admin_signup
   WHERE email LIKE '%eduardo%';
   ```

3. **Resend en modo sandbox:**
   - Por defecto, Resend solo envía a emails verificados
   - Ve a: https://resend.com/domains
   - Agrega y verifica tu dominio

---

## 🧪 PRUEBA ALTERNATIVA: ENVIAR EMAIL MANUALMENTE

Si el email no llega desde la app, prueba enviarlo manualmente:

### **Script de prueba con tu email:**

Edita `test-email.js` línea 50:

```javascript
to: 'eduardo.francisco@alumno.buap.mx', // ← Tu email real
```

Ejecuta:

```bash
node test-email.js
```

**Si este email SÍ llega:**
→ El problema está en el código de la aplicación

**Si este email NO llega:**
→ El problema está en Resend o tu configuración

---

## 📧 VERIFICAR EN RESEND DASHBOARD

1. Ve a: https://resend.com/emails
2. Verás una lista de todos los emails enviados
3. Busca el email a `eduardo.francisco@alumno.buap.mx`
4. Mira el estado:
   - ✅ **Delivered** = Email entregado, revisa bandeja
   - 🔄 **Queued** = En cola, espera unos segundos
   - ❌ **Bounced** = Email no existe o está lleno
   - 📭 **Rejected** = Resend rechazó el envío

---

## 🔧 SOLUCIÓN RÁPIDA: USA TU EMAIL DE PRUEBA

Si sigues teniendo problemas, cambia temporalmente el email destinatario:

En `passwordResetActions.js` línea 42, agrega:

```javascript
// TEMPORAL: Enviar siempre a tu email de prueba
const emailToSend = "tu_email_real@gmail.com"; // ← CAMBIAR
await sendPasswordResetEmail(emailToSend, resetToken, user.name);
```

Esto te permitirá verificar que el sistema funciona.

---

## 📝 CHECKLIST DE DEBUGGING:

- [ ] Backend reiniciado con los nuevos logs
- [ ] Solicitud de reset enviada desde el frontend
- [ ] Logs visibles en consola del backend
- [ ] Sin errores en los logs
- [ ] Revisada carpeta SPAM
- [ ] Verificado en Resend dashboard (https://resend.com/emails)
- [ ] Script `test-email.js` funciona correctamente
- [ ] Email existe en la base de datos

---

## 💡 PRÓXIMOS PASOS:

1. **Reinicia tu backend** con los nuevos logs
2. **Intenta de nuevo** "Olvidé mi contraseña"
3. **Copia y pega** lo que veas en la consola
4. **Revisa** tu dashboard de Resend

**Si sigues teniendo problemas, envíame:**

- Los logs completos de la consola del backend
- Screenshot del dashboard de Resend
- Resultado de: `SELECT * FROM admin_signup WHERE email = 'tu_email';`

¡Vamos a encontrar el problema! 🔍
