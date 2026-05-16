import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

// Mock stock data
const MOCK_STOCKS = {
    AAPL: {
        ticker: 'AAPL',
        name: 'Apple Inc.',
        price: 182.34,
        change: 2.45,
        changePercent: 1.36,
        marketCap: 2800000000000,
        peRatio: 28.5,
        eps: 6.39,
        dividendYield: 0.5,
        sector: 'Technology',
        industry: 'Consumer Electronics',
        ceo: 'Tim Cook',
        employees: 161000,
        headquarters: 'Cupertino, CA'
    },
    MSFT: {
        ticker: 'MSFT',
        name: 'Microsoft Corporation',
        price: 412.18,
        change: -5.23,
        changePercent: -1.25,
        marketCap: 3070000000000,
        peRatio: 32.1,
        eps: 12.83,
        dividendYield: 0.68,
        sector: 'Technology',
        industry: 'Software',
        ceo: 'Satya Nadella',
        employees: 221000,
        headquarters: 'Redmond, WA'
    },
    GOOGL: {
        ticker: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 140.28,
        change: 1.89,
        changePercent: 1.37,
        marketCap: 1820000000000,
        peRatio: 25.3,
        eps: 5.54,
        dividendYield: 0.0,
        sector: 'Technology',
        industry: 'Search Engines',
        ceo: 'Sundar Pichai',
        employees: 190234,
        headquarters: 'Mountain View, CA'
    },
    AMZN: {
        ticker: 'AMZN',
        name: 'Amazon.com Inc.',
        price: 189.65,
        change: -2.34,
        changePercent: -1.22,
        marketCap: 1960000000000,
        peRatio: 58.2,
        eps: 3.26,
        dividendYield: 0.0,
        sector: 'Consumer Cyclical',
        industry: 'Internet Retail',
        ceo: 'Andy Jassy',
        employees: 1541000,
        headquarters: 'Seattle, WA'
    },
    NVDA: {
        ticker: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 875.43,
        change: 18.92,
        changePercent: 2.21,
        marketCap: 2150000000000,
        peRatio: 56.7,
        eps: 15.43,
        dividendYield: 0.02,
        sector: 'Technology',
        industry: 'Semiconductors',
        ceo: 'Jensen Huang',
        employees: 28000,
        headquarters: 'Santa Clara, CA'
    },
    TSLA: {
        ticker: 'TSLA',
        name: 'Tesla Inc.',
        price: 242.15,
        change: 8.73,
        changePercent: 3.74,
        marketCap: 765000000000,
        peRatio: 68.5,
        eps: 3.53,
        dividendYield: 0.0,
        sector: 'Consumer Cyclical',
        industry: 'Auto Manufacturers',
        ceo: 'Elon Musk',
        employees: 128200,
        headquarters: 'Austin, TX'
    }
};

// Generate mock OHLCV data
function generateChartData(days = 90) {
    const data = [];
    let price = 150;
    const now = Date.now();

    for (let i = days; i >= 0; i--) {
        const date = new Date(now - i * 24 * 60 * 60 * 1000);
        const volatility = (Math.random() - 0.5) * 10;

        const open = price;
        const close = price + volatility;
        const high = Math.max(open, close) + Math.abs(Math.random() * 5);
        const low = Math.min(open, close) - Math.abs(Math.random() * 5);
        const volume = Math.floor(50000000 + Math.random() * 100000000);

        data.push({
            date: date.toISOString().split('T')[0],
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(close.toFixed(2)),
            volume,
            timestamp: date.getTime()
        });

        price = close;
    }

    return data;
}

export function useStockDetail(ticker) {
    return useQuery({
        queryKey: ['stock', ticker],
        queryFn: async () => {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 300));

            const stock = MOCK_STOCKS[ticker?.toUpperCase()];
            if (!stock) {
                throw new Error(`Stock ${ticker} not found`);
            }

            return stock;
        },
        enabled: !!ticker,
        staleTime: 60000,
        refetchInterval: 60000
    });
}

export function useStockChart(ticker, interval = '1d') {
    return useQuery({
        queryKey: ['stockChart', ticker, interval],
        queryFn: async () => {
            // Simular delay
            await new Promise(resolve => setTimeout(resolve, 200));

            // Determinar cuántos días basado en intervalo
            let days = 90;
            if (interval === '5d') days = 5;
            else if (interval === '1m') days = 30;
            else if (interval === '3m') days = 90;
            else if (interval === '1y') days = 252;
            else if (interval === '5y') days = 1260;

            return generateChartData(days);
        },
        enabled: !!ticker,
        staleTime: 60000
    });
}

export function useStockNews(ticker) {
    return useQuery({
        queryKey: ['stockNews', ticker],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 300));

            return [
                {
                    headline: `${ticker} Rallies on Strong Earnings Beat`,
                    source: 'Bloomberg',
                    time: '2 hours ago',
                    sentiment: 'positive',
                    image: '/api/placeholder'
                },
                {
                    headline: `Analysts Raise Price Target for ${ticker}`,
                    source: 'Reuters',
                    time: '4 hours ago',
                    sentiment: 'positive',
                    image: '/api/placeholder'
                },
                {
                    headline: `${ticker} Faces Headwinds in Competitive Market`,
                    source: 'CNBC',
                    time: '6 hours ago',
                    sentiment: 'neutral',
                    image: '/api/placeholder'
                }
            ];
        },
        enabled: !!ticker,
        staleTime: 120000,
        refetchInterval: 300000
    });
}

export function useStockOptions(ticker) {
    return useQuery({
        queryKey: ['stockOptions', ticker],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 300));

            const stock = MOCK_STOCKS[ticker?.toUpperCase()];
            if (!stock) return null;

            return {
                ticker,
                price: stock.price,
                expirations: ['2024-05-17', '2024-05-24', '2024-05-31', '2024-06-21', '2024-07-19'],
                calls: generateOptions('CALL', stock.price),
                puts: generateOptions('PUT', stock.price)
            };
        },
        enabled: !!ticker,
        staleTime: 60000
    });
}

function generateOptions(type, spotPrice) {
    const strikes = [];
    for (let i = 0.8; i <= 1.2; i += 0.05) {
        const strike = parseFloat((spotPrice * i).toFixed(2));
        const isCall = type === 'CALL';
        const intrinsicValue = isCall ? Math.max(spotPrice - strike, 0) : Math.max(strike - spotPrice, 0);

        strikes.push({
            strike,
            bid: intrinsicValue + Math.random() * 3,
            ask: intrinsicValue + 0.5 + Math.random() * 3,
            volume: Math.floor(Math.random() * 10000),
            delta: (Math.random() - 0.5) * 0.8,
            gamma: Math.random() * 0.1,
            theta: (Math.random() - 0.5) * 0.05,
            vega: Math.random() * 0.2,
            itm: isCall ? spotPrice > strike : spotPrice < strike
        });
    }
    return strikes;
}
