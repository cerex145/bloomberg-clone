import { mockMarket, mockStocks } from '../data/mockMarket.js';
import { mockNews } from '../data/mockNews.js';
import { mockOptions } from '../data/mockOptions.js';

const USE_REAL_API = process.env.DATA_PROVIDER !== 'mock';

export async function getMarketOverview() {
    if (USE_REAL_API) {
        // Aquí iría la llamada a la API real (Alpha Vantage, Polygon, Finnhub, etc.)
        // Por ahora retorna mock
    }
    return mockMarket.overview;
}

export async function getMarketSectors() {
    if (USE_REAL_API) {
        // Llamada real aquí
    }
    return mockMarket.sectors;
}

export async function getMarketMovers() {
    if (USE_REAL_API) {
        // Llamada real aquí
    }
    return {
        gainers: mockMarket.gainers,
        losers: mockMarket.losers,
        mostActive: mockMarket.mostActive
    };
}

export default {
    getMarketOverview,
    getMarketSectors,
    getMarketMovers
};
