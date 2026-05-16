# Bloomberg Clone - Plataforma Financiera

Una plataforma tipo Bloomberg completamente funcional construida con React 18, Node.js, Express, Socket.io y TailwindCSS.

**Características actuales:**
- ✅ Dashboard en tiempo real con WebSocket
- ✅ Gráficos interactivos con Recharts
- ✅ Screener de acciones con filtros avanzados
- ✅ Datos históricos OHLCV realistas
- ✅ Cadena de opciones con Greeks
- ✅ Feed de noticias por categoría
- ✅ Watchlist persistente
- ✅ Portfolio tracker
- ✅ Calendario económico
- ✅ Datos criptográficos
- ✅ Tema Bloomberg oscuro

**Stack tecnológico:**
- **Frontend:** React 18, Vite, TailwindCSS, Recharts, Zustand, React Query
- **Backend:** Node.js 20, Express, Socket.io, Prisma ORM
- **Base de datos:** PostgreSQL, Redis
- **Infraestructura:** Docker, Docker Compose

---

## Setup Rápido (3 Comandos)

### 1. Instalar dependencias

```bash
# Frontend
cd client && npm install && cd ..

# Backend
cd server && npm install && cd ..
```

### 2. Levantar servicios (PostgreSQL + Redis)

```bash
docker-compose up -d
```

### 3. Ejecutar la aplicación

```bash
# Terminal 1: Backend (puerto 3001)
cd server && npm run dev

# Terminal 2: Frontend (puerto 5173)
cd client && npm run dev
```

Accede a **http://localhost:5173** en tu navegador.

---

## Estructura de Carpetas

```
bloomberg-clone/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/              # Componentes React
│   │   │   ├── layout/              # TopBar, Sidebar, StatusBar
│   │   │   ├── market/              # MarketCard, HeatMap, TickerTape
│   │   │   ├── charts/              # Gráficos (Candlestick, Line, Volume)
│   │   │   ├── portfolio/           # PortfolioTable
│   │   │   ├── news/                # NewsFeed
│   │   │   ├── screener/            # Stock Screener
│   │   │   ├── watchlist/           # Watchlist
│   │   │   ├── options/             # OptionsChain
│   │   │   ├── calendar/            # EconomicCalendar
│   │   │   └── terminal/            # CommandBar (⌘K)
│   │   ├── pages/                   # Páginas principales
│   │   │   ├── Dashboard.jsx
│   │   │   ├── StockDetail.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Screener.jsx
│   │   │   ├── News.jsx
│   │   │   ├── EconomicCalendar.jsx
│   │   │   └── Crypto.jsx
│   │   ├── store/                   # Zustand stores
│   │   │   ├── useMarketStore.js
│   │   │   ├── usePortfolioStore.js
│   │   │   └── useWatchlistStore.js
│   │   ├── hooks/                   # React Query + Socket hooks
│   │   │   ├── useMarketData.js
│   │   │   ├── useStockDetail.js
│   │   │   ├── useNewsData.js
│   │   │   └── useSocket.js
│   │   ├── services/                # API client (axios)
│   │   ├── utils/                   # Formatters, colors
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── server/                          # Node.js backend
│   ├── src/
│   │   ├── routes/                  # API endpoints
│   │   │   ├── market.routes.js
│   │   │   ├── stock.routes.js
│   │   │   ├── news.routes.js
│   │   │   └── screener.routes.js
│   │   ├── controllers/             # Lógica de rutas
│   │   ├── services/                # Lógica de negocios
│   │   ├── data/                    # Mock data estático
│   │   │   ├── mockMarket.js
│   │   │   ├── mockNews.js
│   │   │   └── mockOptions.js
│   │   ├── middleware/              # Error handler, rate limiter
│   │   ├── config/                  # DB, Redis config
│   │   ├── sockets/                 # Socket.io setup
│   │   ├── prisma/                  # Prisma schema
│   │   └── app.js                   # Express app
│   ├── server.js                    # Entry point
│   ├── package.json
│   └── .env.example
│
├── docker-compose.yml               # PostgreSQL + Redis
└── README.md                        # Este archivo
```

---

## Endpoints REST

### Market Data
```
GET  /api/market/overview              → Índices globales (S&P500, NASDAQ, DOW, etc.)
GET  /api/market/sectors               → Performance por sector
GET  /api/market/movers                → Gainers, losers, most active
```

### Stock Data
```
GET  /api/stock/:ticker                → Detalles del activo
GET  /api/stock/:ticker/chart          → OHLCV histórico (query: interval=1d|1w|1m)
GET  /api/stock/:ticker/news           → Noticias relacionadas
GET  /api/stock/:ticker/options        → Cadena de opciones
```

### News
```
GET  /api/news                         → Todas las noticias (query: category=all|markets|economy|crypto)
GET  /api/news/category/:category      → Noticias por categoría
```

### Screener
```
GET  /api/screener                     → Filtrable (query: sector, minPrice, maxPrice, minPE, maxPE, minMarketCap)
```

### WebSocket (Socket.io)
```
emit 'subscribe'       → { tickers: ['AAPL', 'MSFT'] }
listen 'price:update'  → { ticker, price, change, changePercent, volume }
listen 'market:tick'   → { indexes: [...], timestamp }
```

---

## Rutas del Frontend

| Ruta | Descripción |
|------|-------------|
| `/` | Dashboard con overview + heatmap + noticias |
| `/stock/:ticker` | Detalle de activo con gráficos y opciones |
| `/portfolio` | Tracker de posiciones y P&L |
| `/screener` | Stock screener con filtros avanzados |
| `/news` | Feed de noticias por categoría |
| `/calendar` | Calendario económico |
| `/crypto` | Dashboard de criptomonedas |

---

## Conectar Datos Reales

### Patrón de integración

El código está diseñado para cambiar de datos mock a reales **con el mínimo cambio de código**.

Cada servicio backend sigue este patrón:

```javascript
// En src/services/market.service.js
const USE_REAL_API = process.env.DATA_PROVIDER !== 'mock';

export async function getMarketOverview() {
  if (USE_REAL_API) {
    // Aquí llamar a la API real
    return await fetchFromAlphaVantage('/quote/SPX');
  }
  // Datos estáticos por ahora
  return mockMarket.overview;
}
```

### Pasos para integrar APIs reales:

1. **Cambiar `DATA_PROVIDER` en `.env`:**
   ```
   DATA_PROVIDER=live  # en lugar de 'mock'
   ```

2. **Reemplazar las llamadas mock por reales:**
   ```javascript
   // En market.service.js
   if (USE_REAL_API) {
     const response = await axios.get(
       'https://api.example.com/market/overview',
       { headers: { 'X-API-Key': process.env.API_KEY } }
     );
     return response.data;
   }
   ```

3. **Proveedores recomendados:**
   - **Alpha Vantage** - Datos de bolsa en tiempo real
   - **Polygon.io** - Opciones, forex, criptos
   - **Finnhub** - Noticias, financials
   - **CoinGecko** - Datos crypto (gratis)
   - **Yahoo Finance** - Alternativa open-source

4. **Variables de entorno necesarias:**
   ```
   API_KEY_ALPHA_VANTAGE=your_key
   API_KEY_POLYGON=your_key
   API_KEY_FINNHUB=your_key
   ```

---

## Mock Data

### Datos incluidos:

- **20 stocks principales:** AAPL, MSFT, GOOGL, AMZN, META, TSLA, NVDA, JPM, GS, XOM, JNJ, BRK.B, V, MA, AMD, INTC, BA, DIS, NFLX, UBER

- **6 índices globales:** S&P500, NASDAQ, DOW, FTSE, Nikkei, DAX

- **11 sectores:** Tech, Healthcare, Financials, Energy, Industrials, etc.

- **252 velas OHLCV por acción:** Datos históricos realistas con movimiento browniano geométrico

- **Cadena de opciones:** Para AAPL (5 expiraciones, 15 strikes cada una)

- **30 noticias:** Con sentiment analysis y tickers relacionados

### Características del mock data:

✅ **Precios coherentes** - Variación realista día a día  
✅ **Volúmenes creíbles** - Según capitalización de mercado  
✅ **Greeks precisos** - Delta, gamma, theta, vega  
✅ **Noticias auténticas** - Tonos financieros reales  
✅ **WebSocket simulado** - Ticks cada 2 segundos con ruido gaussiano ±0.05%

---

## Características Principales

### 🏠 Dashboard
- Tape de tickers en scroll horizontal
- Tabla de índices globales
- Heatmap de sectores S&P 500 (coloreado por % cambio)
- Feed de últimas noticias
- Watchlist sidebar

### 📊 Stock Detail
- Gráfico interactivo (línea + volumen)
- Selector de intervalos (1D, 5D, 1M, 3M, 1Y, 5Y)
- Datos fundamentales (P/E, Market Cap, Dividend Yield, etc.)
- Cadena de opciones (calls vs puts, ITM/OTM)
- Noticias relacionadas

### 🔍 Screener
- Filtros por sector, P/E, precio, market cap
- Tabla dinámica con 100+ stocks
- Ordenable por columna

### 💼 Portfolio
- Tabla de posiciones con P&L
- Cálculo de retorno total
- Agregar/eliminar posiciones

### 📱 Watchlist
- Persistente en localStorage
- Drag-to-reorder (pronto)
- Múltiples listas

### ⌨️ CommandBar (⌘K)
- Búsqueda global de tickers
- Navegación rápida

### 📈 WebSocket en Tiempo Real
- Precios actualizados cada 2 segundos
- Índices actualizados dinámicamente
- Sin re-render completo de la página

---

## Personalización del Tema

### Colores Bloomberg (en `tailwind.config.js`):

```javascript
colors: {
  'bg-primary': '#0a0e1a',      // Fondo principal
  'bg-secondary': '#0f1525',    // Paneles
  'text-primary': '#e2e8f0',    // Texto principal
  'accent-orange': '#f97316',   // Botones primarios
  'price-green': '#22c55e',     // Precios positivos
  'price-red': '#ef4444'        // Precios negativos
}
```

### Cambiar colores:

1. Editar `client/tailwind.config.js`
2. Usar utilidades en componentes: `bg-accent-orange`, `text-price-green`

---

## Performance & Optimizaciones

- ✅ React Query para caching inteligente
- ✅ Zustand para estado global ligero
- ✅ Lazy loading de componentes
- ✅ WebSocket en lugar de polling
- ✅ Compresión en gráficos (máx 252 velas)
- ✅ Rate limiting en backend (100 req/15min)
- ✅ Helmet.js para headers de seguridad

---

## Desarrollo

### Scripts disponibles:

**Frontend:**
```bash
npm run dev          # Desarrollo con HMR
npm run build        # Build para producción
npm run preview      # Previsualizar build
npm run lint         # ESLint
```

**Backend:**
```bash
npm run dev          # Con nodemon
npm start            # Producción
npm run prisma:migrate   # Migrar BD
npm run prisma:studio    # UI de Prisma
```

---

## Troubleshooting

### Error: "Cannot GET /api/market/overview"
- Verifica que el backend esté corriendo en puerto 3001
- Revisa CORS_ORIGIN en `.env`

### WebSocket no conecta
- Asegúrate que Socket.io esté habilitado en el backend
- Revisa VITE_WS_URL en cliente `.env`

### Datos no se actualizan
- Verifica que DATA_PROVIDER=mock en `.env` del servidor
- Abre DevTools → Console para ver errores

### Puerto ya en uso
```bash
# Cambiar puerto en backend
PORT=3002 npm run dev

# Cambiar puerto en Vite config
```

---

## Próximos Pasos

1. ✅ **Integrar API real** (Alpha Vantage, Polygon.io, etc.)
2. ✅ **Agregar autenticación** (JWT, OAuth)
3. ✅ **Base de datos real** (Prisma + PostgreSQL)
4. ✅ **Alerts** (price alerts, news triggers)
5. ✅ **Advanced charts** (TradingView Lightweight)
6. ✅ **Multi-account support**
7. ✅ **Mobile app** (React Native)
8. ✅ **Backtesting** (estrategias)

---

## License

MIT

---

## Soporte

Para reportar bugs o sugerir features, crea un issue en este repositorio.

**¡Happy trading! 🚀📈**
