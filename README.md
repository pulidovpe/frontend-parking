# 🅿️ ParkSmart Frontend

> Aplicación web progresiva (PWA) para la gestión inteligente de estacionamientos en Venezuela

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet)](https://leafletjs.com/)

## 📋 Descripción

ParkSmart es una plataforma web moderna que permite a los usuarios encontrar, visualizar y reservar espacios de estacionamiento en tiempo real. Diseñada específicamente para el mercado venezolano, ofrece:

- 🗺️ **Búsqueda por geolocalización** - Encuentra parkings cercanos usando GPS
- 📍 **Mapa interactivo** - Visualiza disponibilidad en tiempo real
- 💰 **Multimoneda** - Soporte para USD y VES con tasa de cambio dinámica
- 📱 **PWA** - Instalable en dispositivos móviles sin App Store
- 🎯 **UX optimizada** - Diseño responsive y rápido

## 🔗 Repositorio Relacionado

Este frontend se complementa con el backend del proyecto:

**Backend Repository:** [parking-backend](https://github.com/pulidovpe/parking-backend)
- API REST con Node.js + Fastify + TypeScript
- Base de datos PostgreSQL + PostGIS para geolocalización
- Sistema de autenticación JWT con 2FA
- Gestión de reservas y pagos

## 🚀 Tecnologías Principales

### Core
- **React 18** - Biblioteca de UI
- **Vite 5** - Build tool ultra rápido
- **React Router v6** - Navegación SPA
- **JavaScript** - Lenguaje principal

### Estado y API
- **Zustand** - Gestión de estado global ligera
- **Axios** - Cliente HTTP con interceptores
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

### UI/UX
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Iconos modernos
- **Leaflet** - Mapas interactivos open-source
- **React Leaflet** - Componentes React para Leaflet

### Características Avanzadas
- **PWA** - Service Workers y manifest.json
- **Responsive Design** - Mobile-first approach
- **Geolocalización** - API nativa del navegador
- **Optimización de rendimiento** - Code splitting y lazy loading

## 📁 Estructura del Proyecto

```
parking-frontend/
├── public/
│   ├── icons/              # Iconos PWA (múltiples tamaños)
│   ├── manifest.json       # Configuración PWA
│   └── robots.txt
├── src/
│   ├── assets/             # Imágenes y recursos estáticos
│   ├── components/
│   │   ├── layout/         # Header, Footer, DashboardLayout
│   │   ├── map/            # MapView, ParkingCard, MapSkeleton
│   │   ├── shared/         # Input, Button (componentes reutilizables)
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Landing.jsx     # Página de inicio pública
│   │   ├── Login.jsx       # Autenticación
│   │   ├── Register.jsx    # Registro de usuarios
│   │   ├── Dashboard.jsx   # Panel principal del usuario
│   │   ├── Parkings.jsx    # Búsqueda y mapa de parkings
│   │   ├── Profile.jsx     # Perfil de usuario
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   ├── services/
│   │   ├── api.js          # Configuración Axios + interceptores
│   │   ├── auth.js         # Servicios de autenticación
│   │   └── parkings.js     # Servicios de parkings y espacios
│   ├── store/
│   │   ├── authStore.js    # Estado global de autenticación
│   │   └── parkingStore.js # Estado global de parkings
│   ├── App.jsx             # Router principal
│   ├── main.jsx            # Entry point
│   └── index.css           # Estilos globales + Tailwind
├── .env.example            # Variables de entorno de ejemplo
├── vite.config.js          # Configuración de Vite
├── tailwind.config.js      # Configuración de Tailwind
└── package.json
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js 18+ y npm
- Backend corriendo (ver [parking-backend](https://github.com/pulidovpe/parking-backend))

### Instalación Local

1. **Clonar el repositorio:**
```bash
git clone https://github.com/pulidovpe/frontend-parking.git
cd frontend-parking
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

Edita `.env` con tus configuraciones:
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=ParkSmart
```

**Nota para desarrollo en red local (móviles):**
Si quieres probar en tu teléfono, usa la IP de tu computadora:
```env
VITE_API_URL=http://192.168.1.XXX:3000/api
```

4. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

La app estará disponible en:
- Local: `http://localhost:5173`
- Red: `http://[tu-ip]:5173` (para probar en móviles)

### Comandos Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linter (si configurado)
```

## 🔐 Autenticación

El sistema de autenticación incluye:

- **JWT Tokens** - Access Token (15 min) + Refresh Token (7 días)
- **Refresh automático** - Interceptor de Axios renueva tokens expirados
- **Logout automático** - Si el refresh falla, redirige a login
- **Rutas protegidas** - ProtectedRoute component valida autenticación
- **Persistencia** - Tokens en localStorage con manejo seguro

### Flujo de Autenticación

1. Usuario inicia sesión → Recibe access + refresh tokens
2. Tokens se guardan en localStorage
3. Interceptor de Axios agrega token a cada petición
4. Si access token expira (401) → Automáticamente intenta refresh
5. Si refresh falla → Limpia localStorage y redirige a /login

## 🗺️ Sistema de Mapas

### Características del Mapa

- **Leaflet** como motor de mapas (open-source, sin límites de API)
- **Geolocalización GPS** nativa del navegador
- **Búsqueda por radio** (1-20 km configurable)
- **Marcadores personalizados** (azul para parkings, verde para usuario)
- **Popups informativos** con datos en tiempo real
- **Optimización de rendimiento** (preferCanvas, tileSize)

### API de Parkings

```javascript
// Buscar parkings cercanos
GET /api/parkings/search?lat=10.4806&lng=-66.9036&radiusKm=5

// Obtener detalles de un parking
GET /api/parkings/:id

// Obtener espacios disponibles
GET /api/spaces?parkingId=xxx&status=AVAILABLE
```

## 📱 Características PWA

- ✅ Instalable en home screen (iOS/Android)
- ✅ Funciona offline (próximamente)
- ✅ Notificaciones push (próximamente)
- ✅ Iconos adaptativos para todos los dispositivos
- ✅ Manifest.json configurado

### Instalar como App

**iOS:**
1. Abre Safari
2. Toca el botón de compartir
3. "Agregar a la pantalla de inicio"

**Android:**
1. Abre Chrome
2. Menú (⋮) → "Instalar app" o "Agregar a pantalla de inicio"

## 🎨 Paleta de Colores

```css
Primary:   #2563EB (Azul - Confianza/Tech)
Secondary: #10B981 (Verde - Disponibilidad/Éxito)
Accent:    #8B5CF6 (Morado - Innovación/Premium)
Warning:   #F59E0B (Ámbar - Alertas)
Error:     #EF4444 (Rojo - Errores)
```

## 🔄 Estado del Proyecto

### ✅ Completado (Fases 0-4)

- [x] Setup inicial (Vite + React + Tailwind)
- [x] Landing page responsive
- [x] Sistema de autenticación completo
- [x] Dashboard de usuario
- [x] Rutas protegidas
- [x] Recuperación de contraseña
- [x] Perfil de usuario editable
- [x] Búsqueda de parkings por geolocalización
- [x] Mapa interactivo con Leaflet
- [x] Marcadores y popups
- [x] Lista de parkings cercanos
- [x] Integración completa con backend

### 🚧 En Desarrollo (Fase 5)

- [ ] Sistema de reservas
- [ ] Modal de detalles de parking
- [ ] Selector de espacios específicos
- [ ] Selector de fecha/hora
- [ ] Confirmación de reserva
- [ ] Check-in/Check-out

### 📋 Planificado (Fases 6-8)

- [ ] Historial de reservas
- [ ] Sistema de puntos y loyalty
- [ ] Panel administrativo
- [ ] Gestión de pagos
- [ ] Subir comprobantes
- [ ] Service Workers (offline)
- [ ] Notificaciones push

## 🤝 Integración Backend-Frontend

### Endpoints Utilizados

| Endpoint | Método | Descripción | Estado |
|----------|--------|-------------|--------|
| `/auth/register` | POST | Registro de usuario | ✅ |
| `/auth/login` | POST | Inicio de sesión | ✅ |
| `/auth/refresh` | POST | Renovar tokens | ✅ |
| `/auth/forgot-password` | POST | Recuperar contraseña | ✅ |
| `/auth/reset-password` | POST | Resetear contraseña | ✅ |
| `/parkings/search` | GET | Buscar parkings cercanos | ✅ |
| `/parkings/:id` | GET | Detalles de parking | ✅ |
| `/spaces` | GET | Espacios de parking | ✅ |
| `/reservations` | POST | Crear reserva | 🚧 |
| `/payments` | POST | Reportar pago | 🚧 |

### Variables de Entorno Requeridas

```env
# URL del backend (con /api al final)
VITE_API_URL=http://localhost:3000/api

# Nombre de la aplicación
VITE_APP_NAME=ParkSmart
```

## 🐛 Debugging

### Problemas Comunes

**1. "Network Error" al hacer login:**
- Verifica que el backend esté corriendo en el puerto 3000
- Revisa que `VITE_API_URL` en `.env` sea correcta
- Reinicia el servidor de Vite: `Ctrl+C` → `npm run dev`

**2. Página en blanco después del login:**
- Abre DevTools (F12) → Console
- Busca errores relacionados con localStorage
- Limpia localStorage: `localStorage.clear()`
- Recarga la página

**3. Mapa no carga:**
- Verifica conexión a internet (tiles de OpenStreetMap)
- Revisa consola por errores de Leaflet CSS
- Confirma que Leaflet CSS esté importado

**4. "Cannot read property 'data' of undefined":**
- El backend está devolviendo un formato diferente
- Revisa la respuesta en DevTools → Network → Response
- Ajusta el mapeo en `services/parkings.js`

### Logs de Debug

El proyecto incluye logs detallados en consola:
- 🔍 = Buscando/Intentando
- ✅ = Éxito
- ❌ = Error
- ⚠️ = Advertencia
- 📍 = Geolocalización
- 🅿️ = Parkings

## 📄 Licencia

Este proyecto es de código privado. Todos los derechos reservados.

## 👥 Autor

**Desarrollador:** [@pulidovpe](https://github.com/pulidovpe)

**Proyecto:** ParkSmart Venezuela  
**Año:** 2026  
**Stack:** React + Node.js + PostgreSQL + PostGIS

---

## 🚀 Próximos Pasos

1. ✅ Completar Fase 5 (Sistema de Reservas)
2. ⏭️ Implementar historial y loyalty (Fase 6)
3. ⏭️ Panel administrativo (Fase 7)
4. ⏭️ Sistema de pagos + PWA completa (Fase 8)
5. ⏭️ Deploy a producción (AWS/Vercel)

---

**¿Preguntas o sugerencias?** Abre un issue en el repositorio.
