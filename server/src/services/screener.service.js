import { mockStocks } from '../data/mockMarket.js';

const USE_REAL_API = process.env.DATA_PROVIDER !== 'mock';

export async function screenerStocks(filters = {}) {
    if (USE_REAL_API) {
        // Llamada real aquí
    }

    let results = Object.values(mockStocks);

    // Aplicar filtros
    if (filters.sector) {
        results = results.filter(s => s.sector === filters.sector);
    }

    if (filters.minMarketCap) {
        results = results.filter(s => s.marketCap >= filters.minMarketCap);
    }

    if (filters.minPE && filters.maxPE) {
        results = results.filter(s => s.peRatio >= filters.minPE && s.peRatio <= filters.maxPE);
    }

    if (filters.minPrice && filters.maxPrice) {
        results = results.filter(s => s.price >= filters.minPrice && s.price <= filters.maxPrice);
    }

    return results.map(s => ({
        ticker: s.ticker,
        name: s.name,
        price: s.price,
        change: s.change,
        changePercent: s.changePercent,
        marketCap: s.marketCap,
        peRatio: s.peRatio,
        eps: s.eps,
        dividendYield: s.dividendYield,
        beta: s.beta
    }));
}

export default {
    screenerStocks
};
