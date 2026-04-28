# Nexlayer

> Infraestructura moderna y soluciones automatizadas.

Landing page completa para **Nexlayer** con frontend en **React + Vite** y backend en **Python + FastAPI**.

---

## Stack

- **Frontend**: React 18, Vite 5, CSS moderno (variables, grid, intersection observer)
- **Backend**: FastAPI, Pydantic v2, Uvicorn, SMTP (opcional)
- **Diseño**: Dark theme con azul eléctrico (`#1F6FFF`) y verde acento (`#00E5A0`)
- **Tipografías**: Syne · DM Sans · DM Mono (Google Fonts)

---

## Estructura

```
nexlayer/
├── frontend/              # React + Vite
│   ├── public/
│   ├── src/
│   │   ├── components/    # Navbar, Hero, Services, FleetDemo, About, Pricing, SLATable, Contact, Footer
│   │   ├── hooks/         # useFadeIn (Intersection Observer)
│   │   ├── styles/        # globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/               # FastAPI
│   ├── main.py            # endpoints /api/contact + /api/fleet/demo
│   ├── requirements.txt
│   ├── .env.example
│   └── .env
└── README.md
```

---

## Instalación y ejecución

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env               # editar credenciales SMTP si quieres recibir emails
uvicorn main:app --reload --port 8000
```

API disponible en `http://localhost:8000`. Docs interactivas en `http://localhost:8000/docs`.

> **Nota:** si dejas las variables `SMTP_*` vacías, `/api/contact` igual responde `200` y loguea el payload en consola (útil en desarrollo).

### 2. Frontend (Vite + React)

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

App disponible en `http://localhost:5173`. Vite tiene un proxy hacia el backend en `:8000` (ver `vite.config.js`), así que `/api/*` se redirige automáticamente.

### 3. Build de producción

```bash
cd frontend
npm run build      # genera /frontend/dist
npm run preview    # sirve la build localmente
```

---

## Endpoints del backend

| Método | Ruta                | Descripción |
|--------|---------------------|-------------|
| GET    | `/`                 | Health del servicio |
| GET    | `/api/health`       | Estado + timestamp |
| POST   | `/api/contact`      | Recibe `{ company, email, phone, message }` y envía email de notificación |
| GET    | `/api/fleet/demo`   | Devuelve trailers simulados con estado en tiempo real (cada 3 s desde el front) |

### Ejemplo POST `/api/contact`

```bash
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Logística Andina S.A.C.",
    "email": "contacto@logandina.pe",
    "phone": "+51 999 888 777",
    "message": "Quiero info del plan Flotas."
  }'
```

---

## Variables de entorno (`backend/.env`)

| Variable            | Descripción                                                      |
|---------------------|------------------------------------------------------------------|
| `FRONTEND_ORIGINS`  | Orígenes CORS permitidos (coma-separados)                        |
| `SMTP_HOST`         | Servidor SMTP (ej. `smtp.gmail.com`)                             |
| `SMTP_PORT`         | Puerto (587 para STARTTLS)                                       |
| `SMTP_USER`         | Usuario SMTP / dirección emisora                                 |
| `SMTP_PASSWORD`     | Contraseña o App Password                                        |
| `NOTIFY_EMAIL`      | Dirección destino de las notificaciones del formulario           |

> Para Gmail necesitas una **App Password** (no tu contraseña normal). Crea una en https://myaccount.google.com/apppasswords.

---

## Características destacadas

- **Navbar fijo** con efecto glassmorphism al scrollear y menú móvil con burger animado
- **Hero** con grilla animada, glow radial azul, dot verde pulsando y stats
- **Servicios**: 6 cards con línea superior animada al hover
- **Gestión de flotas**: panel demo en vivo que se actualiza cada 3 segundos consumiendo `/api/fleet/demo`
- **Nosotros**: métricas de empresa + 3 pilares de valor
- **Precios**: 4 planes con plan destacado y plan Flotas con acento verde
- **SLA Table** integrada en la sección de precios
- **Contacto**: formulario funcional con validación y feedback visual
- **Footer** con navegación, contacto y créditos
- **Animaciones fade-up** al scrollear (Intersection Observer)
- **100% responsive** (móvil, tablet, desktop)

---

## Contacto

- 📞 +51 966 111 242
- 💼 [linkedin.com/in/renzo-gutiérrez](https://linkedin.com/in/renzo-gutiérrez)
- 📍 Lima, Perú
