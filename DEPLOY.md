# 🚀 Despliegue gratuito de Nexlayer

Esta guía deja la landing en línea **sin pagar nada** usando:

- **GitHub** → repositorio
- **Vercel** → frontend (`https://nexlayer.vercel.app`)
- **Render** → backend FastAPI (`https://nexlayer-api.onrender.com`)

Tiempo total: **~10 minutos**.

---

## 1. Subir el código a GitHub (3 min)

### 1.1 Crear el repo
1. Entra a https://github.com (crea cuenta si no tienes — usa el email `renzogutierrez966111@gmail.com`).
2. Click en **"New repository"** (botón verde arriba a la derecha).
3. Nombre: `nexlayer`
4. Visibilidad: **Public** (Vercel/Render gratis lo requieren).
5. **NO marques** "Add a README", "Add .gitignore", "Add license" — el repo ya los tiene.
6. Click **"Create repository"**.

### 1.2 Conectar el repo local
GitHub te muestra los comandos. Copia y pega en tu terminal:

```bash
cd /home/renzo/nexlayer
git remote add origin https://github.com/TU_USUARIO/nexlayer.git
git push -u origin main
```

> Te va a pedir credenciales. Usuario: tu usuario de GitHub. Contraseña: necesitas un **Personal Access Token** (no la contraseña real).
>
> Para crear el token: https://github.com/settings/tokens → "Generate new token (classic)" → marca el scope `repo` → Generate. Cópialo y úsalo como contraseña.

---

## 2. Backend en Render (4 min)

1. Entra a https://render.com → **"Sign in with GitHub"** (autoriza).
2. Dashboard → **"New +"** → **"Web Service"**.
3. Click en **"Connect"** al lado de tu repo `nexlayer`.
4. Render detecta automáticamente el archivo `render.yaml`. Click **"Apply"**.
5. Espera 3-5 minutos al primer build (verás logs en vivo).
6. Cuando diga **"Live"**, copia la URL: `https://nexlayer-api.onrender.com` (será similar).

> ⚠️ **El plan free se "duerme"** tras 15 min sin tráfico. La primera carga tras dormir tarda ~30 segundos. Para producción real, paga $7/mes.

### Verificar
Abre `https://TU_URL.onrender.com/api/health` — debe responder `{"status":"ok",...}`.

---

## 3. Frontend en Vercel (3 min)

1. Entra a https://vercel.com → **"Sign Up"** con GitHub.
2. Dashboard → **"Add New..."** → **"Project"**.
3. Busca tu repo `nexlayer` → **"Import"**.
4. **Configure Project**:
   - **Root Directory**: click en "Edit" → selecciona `frontend`
   - Framework Preset: **Vite** (se detecta solo)
5. **Environment Variables** (importante!):
   - Name: `VITE_API_URL`
   - Value: `https://nexlayer-api.onrender.com` (la URL del paso 2, sin slash final)
6. Click **"Deploy"**.
7. Espera ~1 minuto. ¡Listo! Te da `https://nexlayer-XXXX.vercel.app`.

---

## 4. Conectar CORS (1 min)

Si tu URL de Vercel quedó distinta a `nexlayer.vercel.app`:

1. Render Dashboard → tu servicio → **Environment**
2. Edita `FRONTEND_ORIGINS` y pon tu URL real, ej:
   `https://nexlayer-abc123.vercel.app,http://localhost:5173`
3. Click **"Save Changes"** — Render redespliega solo.

---

## 5. (Opcional) Email del formulario de contacto

Para recibir las consultas en tu correo:

1. Ve a https://myaccount.google.com/apppasswords (necesita 2FA activado en tu Gmail).
2. Crea una **App Password** llamada "Nexlayer".
3. En Render → Environment → completa:
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_USER` = `renzogutierrez966111@gmail.com`
   - `SMTP_PASSWORD` = la App Password de 16 caracteres
4. Save → redespliega.

Sin esto, el formulario igual responde 200 y loguea el payload en la consola de Render.

---

## 6. (Opcional) Dominio propio

Cuando ya tengas `.com`:

- **Vercel** → tu proyecto → Settings → Domains → "Add" → ingresa tu dominio.
- Te dice qué registros DNS poner (CNAME o A) en Hostinger.
- En Hostinger → Dominios → DNS → agrega los registros.
- Vercel verifica y emite SSL automático (~5 min).

Si tu dominio sigue apuntando a Hostinger con WordPress, usa un **subdominio**:
`app.tudominio.com` → CNAME → `cname.vercel-dns.com`.

---

## URLs finales

| Servicio | URL |
|----------|-----|
| Frontend | `https://nexlayer.vercel.app` |
| Backend  | `https://nexlayer-api.onrender.com` |
| API docs | `https://nexlayer-api.onrender.com/docs` |
| Repo     | `https://github.com/TU_USUARIO/nexlayer` |

¡Listo Renzo, tu landing está en producción gratis!
