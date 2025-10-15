# 📧 CONFIGURACIÓN DE EMAIL CON RESEND (ALTERNATIVA A GMAIL)

## 🎉 ¿POR QUÉ RESEND?

Google ya no permite crear "Contraseñas de aplicación" fácilmente, así que **Resend es la mejor alternativa**:

✅ **3,000 emails gratis al mes** (suficiente para empezar)  
✅ **Sin tarjeta de crédito** requerida  
✅ **Configuración en 5 minutos**  
✅ **API súper simple**  
✅ **99.9% de entregabilidad** (mejor que Gmail)  
✅ **Ideal para desarrollo Y producción**

---

## 🚀 PASO 1: CREAR CUENTA EN RESEND (2 minutos)

1. **Ve a:** https://resend.com/signup

2. **Regístrate** con tu email (puedes usar cualquier email)

3. **Verifica tu email** (te llegará un enlace de confirmación)

4. **¡Listo!** Ya tienes cuenta gratis con 3,000 emails/mes

---

## 🔑 PASO 2: OBTENER TU API KEY (1 minuto)

1. **Inicia sesión** en Resend

2. **Ve al Dashboard:** https://resend.com/api-keys

3. **Click en "Create API Key"**

4. **Configuración:**

   - **Name:** Plataforma Cursos
   - **Permission:** Full Access
   - **Domain:** (déjalo por defecto si no tienes dominio)

5. **Copia la API Key** que empieza con `re_` (ejemplo: `re_123abc456def`)

   ⚠️ **IMPORTANTE:** Copia la key AHORA, no podrás verla después

---

## ⚙️ PASO 3: CONFIGURAR TU BACKEND (1 minuto)

1. **Crea el archivo `.env`** en `backend_plataformaCursos/`:

```bash
cd backend_plataformaCursos
copy .env.example .env
```

2. **Edita el archivo `.env`** y agrega tu API Key de Resend:

```env
# API Key de Resend
RESEND_API_KEY=re_tu_api_key_aqui

# Email remitente (usa este si no tienes dominio propio)
FROM_EMAIL=onboarding@resend.dev

# Frontend URL
FRONTEND_URL=http://localhost:5173

# JWT Secret
JWT_SECRET=tu_clave_secreta_aqui
```

3. **Guarda el archivo**

---

## ✅ PASO 4: PROBAR QUE FUNCIONA (2 minutos)

### **1. Inicia tu backend:**

```bash
cd backend_plataformaCursos
nodemon index.js
```

**Deberías ver en la consola:**

```
✅ [EMAIL] Servicio de email Resend configurado correctamente
```

### **2. Prueba el "Olvidé mi contraseña":**

1. Ve a tu frontend: http://localhost:5173/login
2. Click en "Olvidé mi contraseña?"
3. Ingresa tu email registrado
4. Click en "Enviar enlace de recuperación"

### **3. Verifica el email:**

- El email llegará a tu bandeja de entrada en **segundos** ⚡
- Si no llega, revisa **SPAM**
- El email vendrá de: `Plataforma de Cursos <onboarding@resend.dev>`

### **4. Usa el enlace:**

- Click en el botón "Restablecer Contraseña"
- Ingresa tu nueva contraseña
- ¡Listo! Ahora puedes hacer login con la nueva contraseña

---

## 🎨 PASO 5 (OPCIONAL): USAR TU PROPIO DOMINIO

Si tienes un dominio (ejemplo: `miempresa.com`), puedes enviar emails desde `noreply@miempresa.com`:

### **1. Agregar dominio en Resend:**

1. Ve a: https://resend.com/domains
2. Click "Add Domain"
3. Ingresa tu dominio: `miempresa.com`
4. Resend te dará registros DNS para agregar

### **2. Configurar DNS:**

Agrega estos registros en tu proveedor de dominio (GoDaddy, Namecheap, etc.):

- **SPF:** `v=spf1 include:resend.com ~all`
- **DKIM:** (Te lo da Resend, es un registro TXT)
- **DMARC:** (Te lo da Resend, es un registro TXT)

### **3. Verificar dominio:**

- Espera 5-30 minutos para que se propaguen los DNS
- En Resend click "Verify"
- Si está todo bien, verás ✅ "Verified"

### **4. Actualizar .env:**

```env
FROM_EMAIL=noreply@miempresa.com
```

¡Listo! Ahora tus emails vendrán de tu propio dominio 🎉

---

## 🔍 TROUBLESHOOTING

### ❌ **Error: "Invalid API key"**

**Solución:**

1. Verifica que copiaste la API key completa
2. Debe empezar con `re_`
3. No debe tener espacios ni saltos de línea
4. Reinicia el servidor después de cambiar `.env`

### ❌ **Error: "Recipient email is invalid"**

**Solución:**

1. Verifica que el email del usuario esté en la BD
2. El formato debe ser válido: `usuario@ejemplo.com`
3. Resend solo permite enviar a emails verificados en modo desarrollo

### ❌ **Los emails llegan a SPAM**

**Solución:**

1. Usa tu propio dominio verificado (paso 5)
2. Agrega registros SPF, DKIM y DMARC
3. Pide a los usuarios que marquen como "No es spam"

### ❌ **Error: "Daily sending limit reached"**

**Solución:**

1. Plan gratuito: 3,000 emails/mes, 100 emails/día
2. Si necesitas más, actualiza a plan pagado ($20/mes = 50,000 emails)
3. O usa otra cuenta de Resend

---

## 📊 MONITOREO DE EMAILS

### **Ver emails enviados:**

1. Ve a: https://resend.com/emails
2. Verás todos los emails con su estado:
   - ✅ **Delivered:** Email entregado correctamente
   - 🔄 **Queued:** En cola para enviar
   - ❌ **Bounced:** Email no existe o está lleno
   - 📭 **Spam:** Marcado como spam

### **Ver estadísticas:**

- Dashboard te muestra gráficas de:
  - Emails enviados hoy/esta semana
  - Tasa de entrega
  - Tasa de apertura (si activas tracking)

---

## 💰 LÍMITES Y PRECIOS

### **Plan Gratuito (actual):**

- ✅ 3,000 emails al mes
- ✅ 100 emails por día
- ✅ 1 dominio verificado
- ✅ Sin tarjeta de crédito

### **Plan Pro ($20/mes):**

- ✅ 50,000 emails al mes
- ✅ Sin límite diario
- ✅ Dominios ilimitados
- ✅ Soporte prioritario

### **¿Cuándo necesitas actualizar?**

Con 3,000 emails gratis al mes tienes para:

- 100 usuarios recuperando contraseña al día ✅
- 1,500 usuarios nuevos registrándose (con email de bienvenida) ✅
- Ideal para proyectos pequeños y medianos ✅

---

## 🆚 COMPARACIÓN: RESEND VS GMAIL

| Característica        | Resend         | Gmail                      |
| --------------------- | -------------- | -------------------------- |
| **Emails gratis**     | 3,000/mes      | ~500/día                   |
| **Sin tarjeta**       | ✅             | ✅                         |
| **Fácil configurar**  | ✅ Super fácil | ❌ Complicado              |
| **Entregabilidad**    | 99.9%          | 85% (si no tienes dominio) |
| **Para producción**   | ✅ Recomendado | ❌ No recomendado          |
| **Límite diario**     | 100            | 500                        |
| **API moderna**       | ✅             | ❌                         |
| **Dashboard**         | ✅             | ❌                         |
| **Bloqueo de Google** | N/A            | ⚠️ Puede bloquearte        |

**Veredicto:** ✅ **Resend es MEJOR en todos los aspectos**

---

## 🔐 SEGURIDAD

### **Proteger tu API Key:**

✅ **Nunca subas .env a Git** (ya está en .gitignore)  
✅ **Usa variables de entorno en producción** (no hardcodear)  
✅ **Regenera la key si se filtra**  
✅ **Usa keys diferentes para desarrollo y producción**

### **Rotar API Key:**

1. Ve a: https://resend.com/api-keys
2. Click "Create API Key" (crea una nueva)
3. Actualiza `.env` con la nueva key
4. Elimina la key antigua

---

## 🎓 RECURSOS ADICIONALES

- 📖 **Documentación oficial:** https://resend.com/docs
- 💬 **Discord de Resend:** https://resend.com/discord
- 🐦 **Twitter:** @resendlabs
- 📧 **Soporte:** support@resend.com

---

## ✅ CHECKLIST FINAL

- [ ] Cuenta de Resend creada
- [ ] Email verificado en Resend
- [ ] API Key generada y copiada
- [ ] Archivo `.env` configurado con `RESEND_API_KEY`
- [ ] Backend reiniciado
- [ ] Mensaje de confirmación en consola: `✅ [EMAIL] Servicio de email Resend configurado`
- [ ] Probado "Olvidé mi contraseña" desde el frontend
- [ ] Email recibido en bandeja de entrada
- [ ] Enlace funciona y redirige a página de reset
- [ ] Nueva contraseña funciona en login

---

## 🎉 ¡FELICIDADES!

Tu sistema de "Olvidé mi contraseña" ahora funciona con **Resend**, una solución:

- ✅ Más fácil que Gmail
- ✅ Más confiable
- ✅ Más profesional
- ✅ Lista para producción

**¿Dudas?** Revisa la [documentación de Resend](https://resend.com/docs) o pregúntame 😊
