import { mockStocks } from '../data/mockMarket.js';
import { mockNews } from '../data/mockNews.js';
import { mockOptions } from '../data/mockOptions.js';

const USE_REAL_API = process.env.DATA_PROVIDER !== 'mock';

export async function getStockDetail(ticker) {
    if (USE_REAL_API) {
        // Llamada real aquí
    }

    const stock = mockStocks[ticker];
    if (!stock) {
        throw new Error(`Stock ${ticker} not found`);
    }

    return stock;
}

export async function getStockChart(ticker, interval = '1d') {
    if (USE_REAL_API) {
        // Llamada real aquí
    }

    const stock = mockStocks[ticker];
    if (!stock) {
        throw new Error(`Stock ${ticker} not found`);
    }

    // Retornar datos OHLCV generados
    return stock.ohlcv;
}

export async function getStockNews(ticker) {
    if (USE_REAL_API) {
        // Llamada real aquí
    }

    return mockNews.filter(article =>
        article.relatedTickers.includes(ticker)
    ).slice(0, 10);
}

export async function getStockOptions(ticker) {
    if (USE_REAL_API) {
        // Llamada real aquí
    }

    const options = mockOptions[ticker];
    if (!options) {
        throw new Error(`Options data for ${ticker} not found`);
    }

    return options;
}

export default {
    getStockDetail,
    getStockChart,
    getStockNews,
    getStockOptions
};
