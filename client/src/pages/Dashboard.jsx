import React, { useMemo, useState } from 'react';
import TopBar from '../components/layout/TopBar';
import Sidebar from '../components/layout/Sidebar';
import StatusBar from '../components/layout/StatusBar';
import TickerTape from '../components/market/TickerTape';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, TrendingDown, Activity, Wallet, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for real-looking components
const MARKET_DATA = {
    sp500: { value: 5412.82, change: 45.28, changePercent: 0.84 },
    nasdaq: { value: 17658.32, change: -82.45, changePercent: -0.47 },
    dow: { value: 42758.20, change: 189.34, changePercent: 0.45 },
};

const TOP_STOCKS = [
    { ticker: 'AAPL', price: 182.34, change: 2.45, changePercent: 1.36, volume: '52.3M' },
    { ticker: 'MSFT', price: 412.18, change: -5.23, changePercent: -1.25, volume: '18.9M' },
    { ticker: 'NVDA', price: 875.43, change: 18.92, changePercent: 2.21, volume: '31.2M' },
    { ticker: 'GOOGL', price: 140.28, change: 1.89, changePercent: 1.37, volume: '24.1M' },
    { ticker: 'AMZN', price: 189.65, change: -2.34, changePercent: -1.22, volume: '52.8M' },
];

const WATCHLIST_ITEMS = [
    { ticker: 'AAPL', price: 182.34, change: 2.45, changePercent: 1.36 },
    { ticker: 'MSFT', price: 412.18, change: -5.23, changePercent: -1.25 },
    { ticker: 'TSLA', price: 242.15, change: 8.73, changePercent: 3.74 },
    { ticker: 'NVDA', price: 875.43, change: 18.92, changePercent: 2.21 },
    { ticker: 'META', price: 502.87, change: -12.45, changePercent: -2.42 },
];

const NEWS_ITEMS = [
    {
        headline: 'Fed Signals Potential Rate Cut in September',
        source: 'Reuters',
        time: '2 hours ago',
        sentiment: 'positive',
        impact: 'High'
    },
    {
        headline: 'Tech Stocks Rally on AI Optimism',
        source: 'Bloomberg',
        time: '3 hours ago',
        sentiment: 'positive',
        impact: 'High'
    },
    {
        headline: 'Oil Prices Climb to 6-Month High',
        source: 'CNBC',
        time: '4 hours ago',
        sentiment: 'neutral',
        impact: 'Medium'
    },
];

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const positions = usePortfolioStore((state) => state.positions);
    const cash = usePortfolioStore((state) => state.cash);
    const [showDetails, setShowDetails] = useState(false);

    const portfolioValue = useMemo(() => {
        const positionsValue = positions.reduce((total, pos) => {
            return total + (pos.shares * pos.currentPrice);
        }, 0);
        return positionsValue + cash;
    }, [positions, cash]);

    const portfolioReturn = useMemo(() => {
        const positionsCost = positions.reduce((total, pos) => {
            return total + (pos.shares * pos.avgCost);
        }, 0);
        const initial = positionsCost + cash;
        const current = positions.reduce((total, pos) => {
            return total + (pos.shares * pos.currentPrice);
        }, 0) + cash;
        return current - initial;
    }, [positions, cash]);

    const returnPercent = portfolioValue > 0 ? (portfolioReturn / portfolioValue) * 100 : 0;

    return (
        <div className="bg-bg-primary text-text-primary min-h-screen">
            <TopBar />
            <Sidebar />
            <TickerTape tickers={TOP_STOCKS} />

            <main className="pl-sidebar-width pt-topbar-height pb-statusbar-height overflow-y-auto">
                {/* Header Section */}
                <div className="border-b border-border-primary sticky top-0 bg-bg-primary/95 backdrop-blur z-30">
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold">Portfolio</h1>
                                <p className="text-text-secondary text-sm mt-1">{user?.name} • {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-bg-secondary border border-border-primary rounded hover:bg-bg-tertiary transition">
                                    <RefreshCw size={18} className="inline" />
                                </button>
                                <button onClick={() => setShowDetails(!showDetails)} className="px-4 py-2 bg-bg-secondary border border-border-primary rounded hover:bg-bg-tertiary transition">
                                    {showDetails ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Portfolio Overview - Large Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Main Portfolio Card */}
                        <div className="bg-gradient-to-br from-blue-900/20 to-bg-secondary border border-blue-700/30 rounded-lg p-6 col-span-1 md:col-span-2">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-text-secondary text-sm mb-2">Total Value</p>
                                    <h2 className="text-5xl font-bold font-mono">${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                                </div>
                                <div className={`text-right p-3 rounded-lg ${portfolioReturn >= 0 ? 'bg-green-900/20' : 'bg-red-900/20'}`}>
                                    <p className="text-text-secondary text-xs mb-1">Today's Return</p>
                                    <p className={`text-2xl font-bold ${portfolioReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {portfolioReturn >= 0 ? '+' : ''}{portfolioReturn.toFixed(2)}
                                    </p>
                                    <p className={`text-xs ${portfolioReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(2)}%
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-3 bg-bg-primary/50 rounded">
                                    <p className="text-text-secondary text-xs mb-1">Invested</p>
                                    <p className="font-bold">${(portfolioValue - cash).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                                <div className="p-3 bg-bg-primary/50 rounded">
                                    <p className="text-text-secondary text-xs mb-1">Cash</p>
                                    <p className="font-bold text-green-400">${cash.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                                <div className="p-3 bg-bg-primary/50 rounded">
                                    <p className="text-text-secondary text-xs mb-1">Holdings</p>
                                    <p className="font-bold">{positions.length}</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats - 2x2 Grid */}
                        <div className="bg-bg-secondary border border-border-primary rounded-lg p-4">
                            <p className="text-text-secondary text-xs mb-2">BUYING POWER</p>
                            <p className="text-2xl font-bold">${cash.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            <p className="text-xs text-text-secondary mt-2">Ready to invest</p>
                        </div>

                        <div className="bg-bg-secondary border border-border-primary rounded-lg p-4">
                            <p className="text-text-secondary text-xs mb-2">DAILY CHANGE</p>
                            <p className={`text-2xl font-bold ${portfolioReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {portfolioReturn >= 0 ? '+' : ''}{returnPercent.toFixed(2)}%
                            </p>
                            <p className="text-xs text-text-secondary mt-2">{positions.length} positions</p>
                        </div>
                    </div>

                    {/* Market Indices */}
                    <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Market Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(MARKET_DATA).map(([key, data]) => (
                                <div key={key} className="p-4 bg-bg-primary/50 rounded hover:bg-bg-primary/70 transition cursor-pointer">
                                    <p className="text-text-secondary text-sm mb-2 uppercase font-bold">{key === 'sp500' ? 'S&P 500' : key === 'nasdaq' ? 'NASDAQ' : 'DOW JONES'}</p>
                                    <div className="flex justify-between items-end">
                                        <p className="text-3xl font-bold font-mono">{data.value.toLocaleString()}</p>
                                        <div className="text-right">
                                            <p className={`font-bold ${data.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}
                                            </p>
                                            <p className={`text-sm ${data.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {data.changePercent >= 0 ? '▲' : '▼'} {Math.abs(data.changePercent).toFixed(2)}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Holdings & Market Movers Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Holdings */}
                        <div className="lg:col-span-1 bg-bg-secondary border border-border-primary rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">My Holdings</h3>
                            <div className="space-y-3">
                                {positions.length > 0 ? (
                                    positions.slice(0, 5).map((pos) => (
                                        <div key={pos.ticker} onClick={() => navigate(`/stock/${pos.ticker}`)} className="p-3 bg-bg-primary/50 rounded hover:bg-bg-primary/70 transition cursor-pointer">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="font-bold text-sm">{pos.ticker}</p>
                                                <p className="text-sm font-mono">${pos.currentPrice.toFixed(2)}</p>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <p className="text-text-secondary">{pos.shares} shares</p>
                                                <p className={((pos.currentPrice - pos.avgCost) / pos.avgCost * 100) >= 0 ? 'text-green-400' : 'text-red-400'}>
                                                    {((pos.currentPrice - pos.avgCost) / pos.avgCost * 100) >= 0 ? '+' : ''}{((pos.currentPrice - pos.avgCost) / pos.avgCost * 100).toFixed(2)}%
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-text-secondary text-sm text-center py-4">No holdings yet</p>
                                )}
                            </div>
                        </div>

                        {/* Top Gainers */}
                        <div className="lg:col-span-1 bg-bg-secondary border border-border-primary rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                <TrendingUp className="inline mr-2 text-green-400" size={20} />
                                Top Gainers
                            </h3>
                            <div className="space-y-3">
                                {TOP_STOCKS.filter(s => s.changePercent > 0).slice(0, 5).map((stock) => (
                                    <div key={stock.ticker} onClick={() => navigate(`/stock/${stock.ticker}`)} className="p-3 bg-bg-primary/50 rounded hover:bg-bg-primary/70 transition cursor-pointer border-l-2 border-green-400">
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold text-sm">{stock.ticker}</p>
                                            <p className="text-green-400 font-bold text-sm">+{stock.changePercent.toFixed(2)}%</p>
                                        </div>
                                        <p className="text-xs text-text-secondary">${stock.price.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Watchlist */}
                        <div className="lg:col-span-1 bg-bg-secondary border border-border-primary rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Watchlist</h3>
                            <div className="space-y-3">
                                {WATCHLIST_ITEMS.slice(0, 5).map((item) => (
                                    <div key={item.ticker} onClick={() => navigate(`/stock/${item.ticker}`)} className="p-3 bg-bg-primary/50 rounded hover:bg-bg-primary/70 transition cursor-pointer">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="font-bold text-sm">{item.ticker}</p>
                                            <p className={`font-bold text-sm ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                                            </p>
                                        </div>
                                        <p className="text-xs text-text-secondary">${item.price.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* News Section */}
                    <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Market News</h3>
                        <div className="space-y-3">
                            {NEWS_ITEMS.map((news, idx) => (
                                <div key={idx} className="p-4 bg-bg-primary/50 rounded hover:bg-bg-primary/70 transition cursor-pointer border-l-4"
                                    style={{ borderColor: news.sentiment === 'positive' ? '#22c55e' : news.sentiment === 'negative' ? '#ef4444' : '#94a3b8' }}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold flex-1">{news.headline}</h4>
                                        <span className={`px-2 py-1 rounded text-xs ml-2 whitespace-nowrap ${news.sentiment === 'positive' ? 'bg-green-900/20 text-green-400' : news.sentiment === 'negative' ? 'bg-red-900/20 text-red-400' : 'bg-gray-900/20 text-gray-400'}`}>
                                            {news.sentiment.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xs text-text-secondary">
                                        <span>{news.source}</span>
                                        <span>{news.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <StatusBar />
        </div>
    );
}
