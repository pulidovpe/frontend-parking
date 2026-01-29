Primary: #2563EB (Azul brillante - Confianza/Tech)
Secondary: #10B981 (Verde - Disponibilidad/Éxito)
Accent: #8B5CF6 (Morado - Innovación/Premium)
Warning: #F59E0B (Ámbar - Alertas)
Error: #EF4444 (Rojo - Errores)
Neutral Dark: #1E293B (Textos principales)
Neutral: #64748B (Textos secundarios)
Light: #F1F5F9 (Fondos claros)
White: #FFFFFF
```

**Decisión de UI:** Usaremos **shadcn/ui** porque:
- ✅ Más moderno y ligero que Ant Design
- ✅ Copias solo los componentes que usas (bundle pequeño)
- ✅ Totalmente personalizable con Tailwind
- ✅ Perfecto para PWA/mobile
- ✅ Gratis y open source

---

# 🗺️ **ROADMAP COMPLETO - 8 FASES**

**Estimación total: 8-10 semanas** (con 10hrs/semana)

| Fase | Nombre | Duración | Prioridad |
|------|--------|----------|-----------|
| **0** | Setup Inicial | 2-3 hrs | 🔴 Crítica |
| **1** | Landing Page | 6-8 hrs | 🔴 Crítica |
| **2** | Auth (Login/Registro) | 8-10 hrs | 🔴 Crítica |
| **3** | Dashboard Usuario | 6-8 hrs | 🟡 Alta |
| **4** | Mapa + Parkings | 10-12 hrs | 🟡 Alta |
| **5** | Reservas | 8-10 hrs | 🟢 Media |
| **6** | Historial + Loyalty | 6-8 hrs | 🟢 Media |
| **7** | Panel Admin | 8-10 hrs | 🟢 Media |
| **8** | Pagos + PWA Final | 8-10 hrs | 🔵 Baja |

---

# 🚀 **FASE 0: SETUP INICIAL**

## Objetivos:
✅ Instalar Vite + React + TypeScript (pero usaremos JS)  
✅ Configurar Tailwind CSS  
✅ Instalar shadcn/ui  
✅ Estructura de carpetas  
✅ Configurar conexión al backend (puerto 3000)  
✅ Primer componente funcional  

---

## 📁 **ESTRUCTURA DE CARPETAS FINAL**
```
parking-frontend/
├── public/
│   ├── icons/           # Iconos PWA
│   ├── manifest.json    # PWA manifest
│   └── robots.txt
├── src/
│   ├── assets/          # Imágenes, logos
│   ├── components/      # Componentes reutilizables
│   │   ├── ui/          # shadcn/ui components
│   │   ├── layout/      # Header, Footer, Sidebar
│   │   └── shared/      # Botones custom, cards, etc.
│   ├── pages/           # Páginas principales
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Map.jsx
│   │   ├── Reservations.jsx
│   │   └── Admin.jsx
│   ├── services/        # Axios + API calls
│   │   ├── api.js       # Configuración base
│   │   ├── auth.js
│   │   ├── parkings.js
│   │   └── reservations.js
│   ├── store/           # Zustand (estado global)
│   │   ├── authStore.js
│   │   └── parkingStore.js
│   ├── utils/           # Helpers
│   │   ├── constants.js
│   │   └── formatters.js
│   ├── hooks/           # Custom hooks
│   │   └── useAuth.js
│   ├── App.jsx          # Router principal
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind imports
├── .env                 # Variables de entorno
├── .env.example
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json