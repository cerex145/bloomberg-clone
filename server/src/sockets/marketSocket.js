import { mockStocks, mockMarket } from '../data/mockMarket.js';

export function setupMarketSocket(io) {
    const priceCache = {};

    // Inicializar cache de precios
    Object.keys(mockStocks).forEach(ticker => {
        priceCache[ticker] = mockStocks[ticker].price;
    });

    io.on('connection', (socket) => {
        console.log(`📡 Client connected: ${socket.id}`);

        // Cliente se suscribe a tickers específicos
        socket.on('subscribe', (data) => {
            const tickers = data.tickers || [];
            console.log(`📊 Subscribe to: ${tickers.join(', ')}`);
            socket.join(`tickers_${tickers.join('_')}`);
            socket.emit('subscribed', { tickers, timestamp: new Date().toISOString() });
        });

        // Cliente se desuscribe
        socket.on('unsubscribe', (data) => {
            const tickers = data.tickers || [];
            console.log(`🔕 Unsubscribe from: ${tickers.join(', ')}`);
            socket.leave(`tickers_${tickers.join('_')}`);
        });

        socket.on('disconnect', () => {
            console.log(`❌ Client disconnected: ${socket.id}`);
        });
    });

    // Simular ticks de precios cada 2 segundos
    const tickInterval = setInterval(() => {
        const tickerUpdates = [];

        Object.keys(mockStocks).forEach(ticker => {
            // Generar cambio de precio pequeño: ±0.05%
            const randomNormal = (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;
            const percentChange = randomNormal * 0.0005; // ±0.05%

            const oldPrice = priceCache[ticker];
            const newPrice = Math.round(oldPrice * (1 + percentChange) * 100) / 100;
            const priceChange = newPrice - oldPrice;
            const changePercent = Math.round((priceChange / oldPrice) * 10000) / 100;

            priceCache[ticker] = newPrice;

            // Generar volumen aleatorio
            const volume = Math.floor(Math.random() * 1000000 + 500000);

            tickerUpdates.push({
                ticker,
                price: newPrice,
                change: Math.round(priceChange * 100) / 100,
                changePercent,
                volume,
                timestamp: new Date().getTime()
            });
        });

        // Emitir actualización de precios a todos los clientes
        io.emit('price:update', tickerUpdates);

        // Emitir actualización de índices de mercado
        const marketUpdate = {
            indexes: mockMarket.overview.map(idx => ({
                ...idx,
                // Actualizar los índices con movimiento pequeño también
                value: Math.round((idx.value * (1 + (Math.random() - 0.5) * 0.001)) * 100) / 100
            })),
            timestamp: new Date().getTime()
        };

        io.emit('market:tick', marketUpdate);
    }, parseInt(process.env.WS_TICKER_INTERVAL_MS || '2000'));

    // Limpiar en caso de cierre
    return () => clearInterval(tickInterval);
}

export default setupMarketSocket;
