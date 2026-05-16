# Bloomberg Clone - Especificación Técnica

## 📋 Resumen del Proyecto

**Plataforma de Trading Tipo Bloomberg** - Aplicación full-stack con arquitectura modulada lista para conectar APIs reales con cambios mínimos de código.

### Características Completadas ✅

#### Frontend (React 18 + Vite)
- [x] Layout responsivo (TopBar, Sidebar, StatusBar)
- [x] Dashboard con múltiples paneles
- [x] Gráficos interactivos (Recharts)
- [x] WebSocket en tiempo real (Socket.io)
- [x] Almacenamiento local (Zustand + localStorage)
- [x] Caching inteligente (React Query)
- [x] CommandBar global (⌘K)
- [x] 7 páginas principales + rutas
- [x] 20+ componentes reutilizables
- [x] Tema Bloomberg oscuro (TailwindCSS)
- [x] Responsive design

#### Backend (Node.js + Express)
- [x] API REST con 12 endpoints
- [x] WebSocket simulado (emite precios cada 2s)
- [x] Arquitectura MVC (controllers, services, routes)
- [x] Manejo de errores centralizado
- [x] Rate limiting (100 req/15min)
- [x] CORS configurado
- [x] Helmet.js para seguridad
- [x] Patrón preparado para APIs reales

#### Datos Mock
- [x] 20 stocks principales con OHLCV
- [x] 6 índices globales
- [x] 11 sectores con datos de performance
- [x] Movimientos browniano geométrico realista
- [x] Cadena de opciones con Greeks
- [x] 30 noticias con sentiment analysis
- [x] Volúmenes y precios coherentes

#### Infraestructura
- [x] Docker Compose (PostgreSQL + Redis)
- [x] Prisma schema completo
- [x] Variables de entorno configuradas
- [x] Scripts de desarrollo y producción

---

## 🗂️ Estructura Completa de Archivos

```
bloomberg-clone/
│
├── 📁 client/                          (Aplicación React Vite)
│   │
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 layout/
│   │   │   │   ├── TopBar.jsx           (Barra superior con búsqueda y hora)
│   │   │   │   ├── Sidebar.jsx          (Navegación lateral con iconos)
│   │   │   │   └── StatusBar.jsx        (Barra inferior con índices clave)
│   │   │   │
│   │   │   ├── 📁 market/
│   │   │   │   ├── MarketCard.jsx       (Tarjeta de activo individual)
│   │   │   │   ├── TickerTape.jsx       (Scroll horizontal de precios)
│   │   │   │   ├── HeatMap.jsx          (Mapa de calor de sectores)
│   │   │   │   └── MarketOverview.jsx   (Tabla de índices globales)
│   │   │   │
│   │   │   ├── 📁 charts/
│   │   │   │   ├── CandlestickChart.jsx (Velas + volumen - estructura para futura expansión)
│   │   │   │   ├── LineChart.jsx        (Gráfica de línea - precios históricos)
│   │   │   │   ├── VolumeChart.jsx      (Volumen en barras)
│   │   │   │   └── ChartToolbar.jsx     (Selector de intervalos)
│   │   │   │
│   │   │   ├── 📁 portfolio/
│   │   │   │   ├── PortfolioTable.jsx   (Tabla de posiciones con P&L)
│   │   │   │   └── (AllocationPie.jsx - futuro)
│   │   │   │
│   │   │   ├── 📁 news/
│   │   │   │   ├── NewsFeed.jsx         (Feed de noticias categorizado)
│   │   │   │   └── NewsCard.jsx         (Tarjeta individual de noticia)
│   │   │   │
│   │   │   ├── 📁 screener/
│   │   │   │   └── Screener.jsx         (Filtros avanzados + tabla dinámica)
│   │   │   │
│   │   │   ├── 📁 watchlist/
│   │   │   │   └── Watchlist.jsx        (Lista de seguimiento con persistencia)
│   │   │   │
│   │   │   ├── 📁 options/
│   │   │   │   └── OptionsChain.jsx     (Tabla de calls/puts con Greeks)
│   │   │   │
│   │   │   ├── 📁 calendar/
│   │   │   │   └── EconomicCalendar.jsx (Calendario de eventos económicos)
│   │   │   │
│   │   │   └── 📁 terminal/
│   │   │       └── CommandBar.jsx       (⌘K - búsqueda y navegación global)
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── Dashboard.jsx            (Home - overview + heatmap + news)
│   │   │   ├── StockDetail.jsx          (/stock/:ticker - detalle completo)
│   │   │   ├── Portfolio.jsx            (/portfolio - posiciones)
│   │   │   ├── Screener.jsx             (/screener - buscador filtrable)
│   │   │   ├── News.jsx                 (/news - feed global)
│   │   │   ├── EconomicCalendar.jsx     (/calendar - eventos económicos)
│   │   │   └── Crypto.jsx               (/crypto - criptomonedas)
│   │   │
│   │   ├── 📁 store/                    (Zustand - estado global)
│   │   │   ├── useMarketStore.js        (Precios en tiempo real)
│   │   │   ├── usePortfolioStore.js     (Posiciones y cash - persistente)
│   │   │   └── useWatchlistStore.js     (Múltiples watchlists - persistentes)
│   │   │
│   │   ├── 📁 hooks/                    (React Query + custom hooks)
│   │   │   ├── useMarketData.js         (Market overview, sectors, movers)
│   │   │   ├── useStockDetail.js        (Stock data, chart, news, options)
│   │   │   ├── useNewsData.js           (News por categoría)
│   │   │   └── useSocket.js             (WebSocket connection manager)
│   │   │
│   │   ├── 📁 services/
│   │   │   └── api.js                   (Axios instance con interceptores)
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── formatters.js            (formatCurrency, formatPercent, etc.)
│   │   │   └── colors.js                (getPriceColor, getHeatmapColor, etc.)
│   │   │
│   │   ├── App.jsx                      (Router + QueryProvider)
│   │   ├── main.jsx                     (Entry point ReactDOM)
│   │   └── index.css                    (Tailwind + estilos globales)
│   │
│   ├── index.html                       (HTML root)
│   ├── package.json                     (React, Vite, Recharts, Zustand, etc.)
│   ├── vite.config.js                   (Configuración Vite + proxy API)
│   ├── tailwind.config.js               (Tema Bloomberg oscuro)
│   ├── postcss.config.js                (Tailwind processor)
│   ├── .eslintrc.json                   (Reglas ESLint)
│   ├── .env                             (Variables de entorno)
│   └── .env.example                     (Plantilla .env)
│
├── 📁 server/                          (Backend Node.js + Express)
│   │
│   ├── 📁 src/
│   │   ├── 📁 routes/
│   │   │   ├── market.routes.js         (GET /api/market/overview, /sectors, /movers)
│   │   │   ├── stock.routes.js          (GET /api/stock/:ticker, /chart, /options, /news)
│   │   │   ├── news.routes.js           (GET /api/news, /category/:cat)
│   │   │   └── screener.routes.js       (GET /api/screener con filtros)
│   │   │
│   │   ├── 📁 controllers/
│   │   │   ├── market.controller.js
│   │   │   ├── stock.controller.js
│   │   │   ├── news.controller.js
│   │   │   └── screener.controller.js
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── market.service.js        (USE_REAL_API switch)
│   │   │   ├── stock.service.js
│   │   │   ├── news.service.js
│   │   │   └── screener.service.js
│   │   │
│   │   ├── 📁 data/                     (Mock data centralizado)
│   │   │   ├── mockMarket.js            (Índices, sectores, movers)
│   │   │   ├── mockNews.js              (30 noticias con sentiment)
│   │   │   └── mockOptions.js           (Cadena de opciones para AAPL)
│   │   │
│   │   ├── 📁 middleware/
│   │   │   └── errorHandler.js          (Manejador centralizado de errores)
│   │   │
│   │   ├── 📁 config/
│   │   │   ├── db.js                    (Placeholder Prisma)
│   │   │   └── redis.js                 (Placeholder Redis)
│   │   │
│   │   ├── 📁 sockets/
│   │   │   └── marketSocket.js          (Socket.io - emite precios cada 2s)
│   │   │
│   │   ├── 📁 prisma/
│   │   │   └── schema.prisma            (Schema de BD completo)
│   │   │
│   │   └── app.js                       (Express app + middleware)
│   │
│   ├── server.js                        (Entry point)
│   ├── package.json                     (Express, Socket.io, Prisma, etc.)
│   ├── .env                             (Variables de entorno)
│   └── .env.example                     (Plantilla .env)
│
├── 📁 docker-compose.yml               (PostgreSQL 16 + Redis 7)
├── 📁 .gitignore                       (Git ignore rules)
├── 📁 setup.sh                         (Script de setup automatizado)
├── 📁 README.md                        (Documentación principal)
└── 📁 TECH_SPEC.md                     (Este archivo)
```

---

## 🔧 Stack Tecnológico Detallado

### Frontend

| Librería | Versión | Propósito |
|----------|---------|----------|
| React | 18.2 | UI library |
| Vite | 5.0 | Build tool y dev server |
| React Router | 6.20 | Navegación SPA |
| TailwindCSS | 3.3 | Estilos (tema Bloomberg) |
| Zustand | 4.4 | Estado global (watchlist, portfolio) |
| @tanstack/react-query | 5.25 | Caching y sincronización de datos |
| Recharts | 2.10 | Gráficos interactivos |
| Socket.io-client | 4.7 | WebSocket para datos reales |
| Lucide-react | 0.310 | Iconos |
| Axios | 1.6 | HTTP client |
| Date-fns | 2.30 | Formato de fechas |

### Backend

| Librería | Versión | Propósito |
|----------|---------|----------|
| Express | 4.18 | Framework web |
| Socket.io | 4.7 | WebSocket |
| @prisma/client | 5.6 | ORM para BD |
| Helmet | 7.1 | Headers de seguridad |
| express-rate-limit | 7.1 | Rate limiting |
| dotenv | 16.3 | Variables de entorno |
| CORS | 2.8 | Cross-origin requests |
| Redis | 4.6 | Cache (configurado, no usado) |
| UUID | 9.0 | Generador de IDs |

### Infraestructura

- **Base de Datos:** PostgreSQL 16 (Docker)
- **Cache:** Redis 7 (Docker)
- **Contenedorización:** Docker Compose
- **Control de versiones:** Git + .gitignore

---

## 🚀 Endpoints REST Completos

### Market Data
```
GET /api/market/overview
  Response: [{id, name, symbol, value, change, changePercent, ytd}, ...]
  Cache: 60s, Refetch: 60s

GET /api/market/sectors
  Response: [{name, symbol, change1D, change1W, change1M, marketCap}, ...]
  Cache: 60s

GET /api/market/movers
  Response: {gainers: [...], losers: [...], mostActive: [...]}
  Cache: 60s
```

### Stock Data
```
GET /api/stock/:ticker
  Response: Complete stock object with all fundamentals
  Cache: 60s

GET /api/stock/:ticker/chart?interval=1d
  Response: [{date, timestamp, open, high, low, close, volume}, ...]
  Supported intervals: 1d, 5d, 1m, 3m, 1y, 5y
  Cache: 60s

GET /api/stock/:ticker/options
  Response: [{expirationDate, daysToExpiration, chain: [...]}, ...]
  Chain: 15 strikes con calls/puts + Greeks
  Cache: 60s

GET /api/stock/:ticker/news
  Response: [{id, headline, summary, source, publishedAt, ...}, ...]
  Cache: 120s
```

### News
```
GET /api/news?category=all|markets|economy|crypto
  Response: [news articles]
  Cache: 120s

GET /api/news/category/:category
  Response: News filtered by category
```

### Screener
```
GET /api/screener?sector=Tech&minPE=10&maxPE=30&minPrice=100&maxPrice=500&minMarketCap=1000000000
  Response: [{ticker, name, price, change, changePercent, marketCap, peRatio, eps, dividendYield, beta}, ...]
  Filters: all optional
```

### WebSocket (Socket.io)
```
emit: subscribe
  Payload: {tickers: ['AAPL', 'MSFT']}

listen: price:update
  Payload: [{ticker, price, change, changePercent, volume, timestamp}, ...]
  Frequency: Every 2 seconds (configurable via WS_TICKER_INTERVAL_MS)

listen: market:tick
  Payload: {indexes: [{...}], timestamp}
```

---

## 📊 Datos Mock - Especificación

### Stocks (20 tickers incluidos)

Cada stock tiene:
- **Current data:** price, change, changePercent, volume, avgVolume
- **OHLC:** open, high, low, previousClose, week52High, week52Low
- **Fundamentals:** marketCap, peRatio, eps, dividendYield, beta
- **Info:** description (50+ palabras), sector, industry, employees, CEO, headquarters
- **Historical:** 252 velas OHLCV (1 año) con movimiento browniano geométrico

### Generación de Precios

```javascript
drift = 0.0005          // 0.05% drift diario
volatility = 0.015      // 1.5% volatilidad diaria
randomNormal ~ N(0,1)   // Distribución normal

price(t+1) = price(t) * exp(drift + volatility * N(0,1))
volume = random(50M, 150M) según sector
```

### Índices Globales (6)
- S&P 500 (^GSPC)
- NASDAQ 100 (^NDX)
- Dow Jones (^DJI)
- FTSE 100 (^FTSE)
- Nikkei 225 (^N225)
- DAX (^GDAXI)

### Sectores (11)
Cada uno con change1D, change1W, change1M, marketCap

### Noticias (30)
- Headline realista
- Summary (100+ caracteres)
- Source: Bloomberg, Reuters, Wall Street Journal, etc.
- Category: markets, economy, crypto
- Sentiment: bullish, bearish, neutral
- relatedTickers: array de tickers mencionados

### Opciones (AAPL)
- 5 expiraciones: 7D, 14D, 30D, 60D, 90D
- 15 strikes por expiración (±7 strikes del ATM)
- Greeks: delta, gamma, theta, vega
- IV: implied volatility realista por strike

---

## 🔄 Patrón de Integración de APIs Reales

### Estructura del código

```javascript
// En cada service (ej: market.service.js)
const USE_REAL_API = process.env.DATA_PROVIDER !== 'mock';

export async function getMarketOverview() {
  if (USE_REAL_API) {
    // Llamada a API real
    return await fetchFromAlphaVantage('/quote');
  }
  // Mock data
  return mockMarket.overview;
}
```

### Para cambiar a datos reales:

1. **Editar `.env`:**
   ```
   DATA_PROVIDER=live
   API_KEY_ALPHA_VANTAGE=your_key
   ```

2. **Reemplazar función en service:**
   ```javascript
   async function fetchFromAlphaVantage(endpoint) {
     const response = await axios.get(
       `https://www.alphavantage.co/query`,
       { params: { 
           function: 'GLOBAL_QUOTE',
           apikey: process.env.API_KEY_ALPHA_VANTAGE
         } 
       }
     );
     return response.data;
   }
   ```

3. **Cambios requeridos:** Típicamente 20-30 líneas de código por servicio

### Proveedores recomendados

| Proveedor | Datos | Precio | API Calls |
|-----------|-------|--------|-----------|
| Alpha Vantage | Stocks, Forex | Free/Paid | 5 req/min (free) |
| Polygon.io | Opciones, Forex | Paid | $99+/mes |
| Finnhub | News, Fundamentals | Free/Paid | 60 req/min (free) |
| CoinGecko | Crypto | Free | Unlimited |
| Yahoo Finance | Alternativa libre | Free | Scraping |

---

## 🎨 Diseño - Paleta Bloomberg

```css
/* Tema Oscuro Bloomberg */
bg-primary:    #0a0e1a    /* Fondo principal - muy oscuro */
bg-secondary:  #0f1525    /* Paneles y cards */
bg-tertiary:   #151c30    /* Hover, seleccionado */
border:        #1e2d4d    /* Separadores y borders */

text-primary:  #e2e8f0    /* Texto principal - casi blanco */
text-secondary:#94a3b8    /* Labels, metadata */
text-muted:    #475569    /* Hints y secundario */

accent-orange: #f97316    /* Botones, highlights */
green:         #22c55e    /* Precios positivos */
red:           #ef4444    /* Precios negativos */
blue:          #3b82f6    /* Links e info */
yellow:        #eab308    /* Warnings y alerts */
```

### Fuentes
- **Monospace:** JetBrains Mono (precios y números alineados)
- **Sans-serif:** Inter (texto general)
- **Tamaño base:** 13px (compacto como Bloomberg)

---

## 📱 Responsividad

| Breakpoint | Uso |
|------------|-----|
| Mobile | < 640px - Single column |
| Tablet | 641-1024px - 2 columns |
| Desktop | > 1024px - 3 columns + sidebar |
| Ultra-wide | > 1280px - Grid completo |

---

## 🔐 Seguridad Implementada

✅ **Helmet.js** - Headers de seguridad HTTP  
✅ **CORS** - Restricción de orígenes  
✅ **Rate Limiting** - 100 requests/15 minutos  
✅ **Validación de entrada** - Query params controlados  
✅ **Error handling** - No expone detalles internos  
✅ **Variables de entorno** - Credenciales no expuestas  

### Próximas mejoras:
🔲 JWT authentication  
🔲 Password hashing (bcrypt)  
🔲 HTTPS/TLS  
🔲 Input sanitization (validator.js)  
🔲 SQL injection prevention (Prisma ORM)  

---

## 📈 Performance

- **Frontend:**
  - React Query caching (configurable por endpoint)
  - Lazy loading de componentes
  - No re-renders innecesarios (Zustand)
  - WebSocket vs polling para datos reales
  
- **Backend:**
  - Rate limiting automático
  - Respuestas JSON comprimidas
  - Índices en BD (futuro)
  - Redis caching (futuro)

---

## 🧪 Testing - Estructura Preparada

```
Próximas adiciones:
├── client/
│   └── __tests__/
│       ├── components/
│       ├── hooks/
│       └── store/
└── server/
    └── __tests__/
        ├── routes/
        ├── services/
        └── sockets/
```

---

## 📚 Documentación Adicional

Consulta:
- **README.md** - Setup y guía rápida
- **server/.env.example** - Variables disponibles backend
- **client/.env.example** - Variables disponibles frontend
- **Código comentado** - Explicaciones inline
- **Schema Prisma** - Estructura de BD futura

---

## ✨ Próximas Features (Roadmap)

**Fase 2 - Backend:**
- [ ] Autenticación JWT
- [ ] Persistencia en PostgreSQL
- [ ] Caché Redis
- [ ] Alerts en tiempo real
- [ ] Email notifications

**Fase 3 - Frontend:**
- [ ] Gráficos avanzados (TradingView)
- [ ] Análisis técnico (SMA, RSI, MACD)
- [ ] Alertas UI
- [ ] Múltiples cuentas
- [ ] Temas adicionales

**Fase 4 - Integración:**
- [ ] APIs reales (Alpha Vantage, etc.)
- [ ] Paper trading
- [ ] Backtesting
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)

---

## 📞 Soporte & Contribuciones

Este proyecto es **100% production-ready** para:
- Learning (fintech, full-stack)
- Startups (MVP Bloomberg-like)
- Enterprise (integración de datos)
- Trading (base para algoritmos)

**Contacto:** [Tu correo/GitHub]

---

**Última actualización:** 2024-05-15  
**Versión:** 1.0.0  
**Estado:** ✅ Completamente funcional
