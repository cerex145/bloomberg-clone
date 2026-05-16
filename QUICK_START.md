# 🚀 Bloomberg Clone - Quick Start (5 minutos)

## Requisitos previos
- Node.js 18+ (https://nodejs.org)
- Docker Desktop (https://www.docker.com/products/docker-desktop)
- Git (opcional)

## Paso 1️⃣: Clonar o descargar

```bash
cd c:/Users/Carlos/Downloads/xd/bloomberg-clone
```

## Paso 2️⃣: Instalar dependencias (1 min)

```bash
# Frontend
cd client && npm install && cd ..

# Backend  
cd server && npm install && cd ..
```

## Paso 3️⃣: Iniciar servicios (1 min)

```bash
# Levantar PostgreSQL y Redis en Docker
docker-compose up -d

# Verificar que están corriendo
docker ps
```

## Paso 4️⃣: Ejecutar la app (en 2 terminales)

### Terminal 1 - Backend (puerto 3001)
```bash
cd server
npm run dev
```

Espera a ver: `🚀 Server running on http://localhost:3001`

### Terminal 2 - Frontend (puerto 5173)
```bash
cd client
npm run dev
```

Espera a ver: `Local: http://localhost:5173`

## ✅ ¡Listo!

Abre **http://localhost:5173** en tu navegador. 

🎯 La plataforma Bloomberg está corriendo con:
- ✅ Datos en tiempo real simulado (WebSocket)
- ✅ 20 stocks con gráficos OHLCV
- ✅ Screener con filtros
- ✅ Portfolio tracker
- ✅ Noticias en vivo
- ✅ Watchlist persistente

---

## 🎮 Cómo probar la app

### 1. Dashboard
- Ve a inicio (home)
- Observa precios actualizándose en tiempo real
- Mira el heatmap de sectores

### 2. Stock Detail
- Busca un stock con **⌘K** (o Ctrl+K en Windows/Linux)
- Escribe: `AAPL`, `MSFT`, `TSLA`
- Ve gráficos, opciones, noticias

### 3. Screener
- Filtrar por sector, P/E, precio
- Resultado: 100+ stocks filtrados en tiempo real

### 4. Portfolio
- Posiciones precargadas
- Calcula P&L automáticamente

### 5. Watchlist
- Adds tickers a favoritos
- Persiste en navegador

---

## 🛑 Detener la app

```bash
# En las terminales
Ctrl+C (en cada terminal)

# Detener servicios Docker
docker-compose down
```

---

## 📊 Datos Precargados

✅ **Tickers:** AAPL, MSFT, GOOGL, AMZN, META, TSLA, NVDA, JPM, GS, XOM, JNJ, BRK.B, V, MA, AMD, INTC, BA, DIS, NFLX, UBER

✅ **Índices:** S&P 500, NASDAQ, DOW, FTSE, Nikkei, DAX

✅ **Opciones:** AAPL (5 expiraciones)

✅ **Noticias:** 30 artículos con sentiment

---

## 🔧 Troubleshooting

### ❌ "Cannot GET /api/market/overview"
→ Verifica que backend corra en puerto 3001
```bash
lsof -i :3001  # Verificar puerto
```

### ❌ "Port 5173 already in use"
→ Cambiar puerto en client/vite.config.js
```javascript
server: { port: 5174 }
```

### ❌ Docker "not running"
→ Abre Docker Desktop y espera a que esté listo

### ❌ WebSocket no conecta
→ Verifica que `VITE_WS_URL=http://localhost:3001` en client/.env

---

## 📚 Archivos importantes

| Archivo | Propósito |
|---------|----------|
| `README.md` | Documentación completa |
| `TECH_SPEC.md` | Especificación técnica |
| `docker-compose.yml` | Servicios (PostgreSQL + Redis) |
| `server/.env` | Config backend |
| `client/.env` | Config frontend |
| `server/src/data/mockMarket.js` | Datos mock (editable) |

---

## 🎯 Próximos pasos

1. **Conectar API real:**
   - Editar `server/.env`: `DATA_PROVIDER=live`
   - Agregar claves API (Alpha Vantage, Polygon, etc.)

2. **Personalizar:**
   - Cambiar colores en `client/tailwind.config.js`
   - Agregar más stocks en mock data
   - Añadir nuevas páginas

3. **Deploy:**
   - Vercel (frontend)
   - Heroku/Railway (backend)
   - AWS/GCP (infraestructura)

---

## 🎓 Recursos

- **React:** https://react.dev
- **Vite:** https://vitejs.dev
- **TailwindCSS:** https://tailwindcss.com
- **Express:** https://expressjs.com
- **Socket.io:** https://socket.io
- **Recharts:** https://recharts.org

---

## ✨ Features destacadas

🟠 **Tema Bloomberg** - Diseño profesional oscuro  
⚡ **WebSocket** - Datos en tiempo real sin polling  
📊 **Gráficos interactivos** - Recharts  
🔍 **Screener avanzado** - Filtros múltiples  
💾 **Persistencia** - localStorage (watchlist, portfolio)  
🌐 **Responsivo** - Mobile, tablet, desktop  
🚀 **Production-ready** - Error handling, rate limiting, CORS  

---

## 🆘 ¿Necesitas ayuda?

1. Lee `README.md` para documentación completa
2. Revisa `TECH_SPEC.md` para arquitectura
3. Checkea los logs de terminal para errores
4. Verifica que Puerto 3001 y 5173 estén disponibles

---

**¡Happy trading! 📈💹**

Creado con ❤️ en 2024
