import React, { useState } from 'react';
import TopBar from '../components/layout/TopBar';
import Sidebar from '../components/layout/Sidebar';
import StatusBar from '../components/layout/StatusBar';
import MarketOverview from '../components/market/MarketOverview';
import HeatMap from '../components/market/HeatMap';
import { useMarketOverview, useMarketMovers } from '../hooks/useMarketData';
import { formatCurrency, formatPercent, formatVolume, formatMarketCap } from '../utils/formatters';
import { getPriceColor } from '../utils/colors';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Markets() {
    const navigate = useNavigate();
    const { data: overview, isLoading: overviewLoading } = useMarketOverview();
    const { data: movers, isLoading: moversLoading } = useMarketMovers();
    const [searchTicker, setSearchTicker] = useState('');
    const [view, setView] = useState('overview'); // overview, heatmap, movers

    const filteredMovers = movers || { gainers: [], losers: [], mostActive: [] };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTicker.trim()) {
            navigate(`/stock/${searchTicker.toUpperCase()}`);
            setSearchTicker('');
        }
    };

    return (
        <div className="bg-bg-primary text-text-primary min-h-screen">
            <TopBar />
            <Sidebar />

            <main className="pl-sidebar-width pt-topbar-height pb-statusbar-height">
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-text-primary mb-4">Markets Overview</h1>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex gap-2 mb-4 max-w-md">
                            <input
                                type="text"
                                value={searchTicker}
                                onChange={(e) => setSearchTicker(e.target.value)}
                                placeholder="Search ticker (e.g., AAPL, MSFT)"
                                className="flex-1 bg-bg-secondary border border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-accent-orange"
                            />
                            <button
                                type="submit"
                                className="bg-accent-orange text-white px-4 py-2 rounded hover:bg-orange-500 transition flex items-center gap-2"
                            >
                                <Search size={16} />
                                Search
                            </button>
                        </form>

                        {/* View Tabs */}
                        <div className="flex gap-2 border-b border-border mb-6">
                            {[
                                { id: 'overview', label: 'Indices & Overview' },
                                { id: 'heatmap', label: 'Sector Heatmap' },
                                { id: 'movers', label: 'Movers' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setView(tab.id)}
                                    className={`px-4 py-2 font-semibold border-b-2 transition ${view === tab.id
                                        ? 'border-accent-orange text-accent-orange'
                                        : 'border-transparent text-text-secondary hover:text-text-primary'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* OVERVIEW VIEW */}
                    {view === 'overview' && (
                        <div className="space-y-6">
                            <MarketOverview />

                            {/* Top Stocks Table */}
                            <div className="bg-bg-secondary border border-border rounded-lg p-4">
                                <h2 className="text-lg font-semibold text-text-primary mb-4">Top Stocks</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="text-left py-2 px-3 text-text-secondary">Ticker</th>
                                                <th className="text-left py-2 px-3 text-text-secondary">Price</th>
                                                <th className="text-left py-2 px-3 text-text-secondary">Change</th>
                                                <th className="text-left py-2 px-3 text-text-secondary">Volume</th>
                                                <th className="text-left py-2 px-3 text-text-secondary">Market Cap</th>
                                                <th className="text-left py-2 px-3 text-text-secondary">P/E</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { ticker: 'AAPL', name: 'Apple', price: 182.34, change: 2.45, changePercent: 1.36, volume: 52340000, marketCap: 2800000000000, pe: 28.5 },
                                                { ticker: 'MSFT', name: 'Microsoft', price: 412.18, change: 5.62, changePercent: 1.38, volume: 18200000, marketCap: 3050000000000, pe: 32.1 },
                                                { ticker: 'GOOGL', name: 'Google', price: 140.28, change: 1.92, changePercent: 1.38, volume: 21800000, marketCap: 1920000000000, pe: 24.3 },
                                                { ticker: 'AMZN', name: 'Amazon', price: 174.56, change: 3.21, changePercent: 1.87, volume: 42100000, marketCap: 1800000000000, pe: 52.6 },
                                                { ticker: 'NVDA', name: 'NVIDIA', price: 875.32, change: 18.45, changePercent: 2.15, volume: 32500000, marketCap: 2150000000000, pe: 61.2 },
                                            ].map(stock => (
                                                <tr key={stock.ticker} className="border-b border-border/50 hover:bg-bg-primary transition cursor-pointer" onClick={() => navigate(`/stock/${stock.ticker}`)}>
                                                    <td className="py-3 px-3 font-semibold">{stock.ticker}</td>
                                                    <td className="py-3 px-3 font-mono">${stock.price.toFixed(2)}</td>
                                                    <td className={`py-3 px-3 font-mono ${getPriceColor(stock.change)}`}>
                                                        {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({formatPercent(stock.changePercent)})
                                                    </td>
                                                    <td className="py-3 px-3">{formatVolume(stock.volume)}</td>
                                                    <td className="py-3 px-3">${formatMarketCap(stock.marketCap)}</td>
                                                    <td className="py-3 px-3">{stock.pe.toFixed(1)}x</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* HEATMAP VIEW */}
                    {view === 'heatmap' && (
                        <div className="bg-bg-secondary border border-border rounded-lg p-6">
                            <HeatMap />
                        </div>
                    )}

                    {/* MOVERS VIEW */}
                    {view === 'movers' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Gainers */}
                            <div className="bg-bg-secondary border border-border rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                                    <TrendingUp size={18} />
                                    Top Gainers
                                </h3>
                                <div className="space-y-3">
                                    {filteredMovers.gainers.slice(0, 10).map(stock => (
                                        <div
                                            key={stock.ticker}
                                            className="p-3 bg-bg-primary rounded border border-border/50 hover:border-green-700/50 transition cursor-pointer"
                                            onClick={() => navigate(`/stock/${stock.ticker}`)}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold">{stock.ticker}</p>
                                                    <p className="text-xs text-text-secondary">{stock.name}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-mono font-semibold text-green-400">+{stock.changePercent.toFixed(2)}%</p>
                                                    <p className="text-xs text-text-secondary">${stock.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Losers */}
                            <div className="bg-bg-secondary border border-border rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                                    <TrendingDown size={18} />
                                    Top Losers
                                </h3>
                                <div className="space-y-3">
                                    {filteredMovers.losers.slice(0, 10).map(stock => (
                                        <div
                                            key={stock.ticker}
                                            className="p-3 bg-bg-primary rounded border border-border/50 hover:border-red-700/50 transition cursor-pointer"
                                            onClick={() => navigate(`/stock/${stock.ticker}`)}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold">{stock.ticker}</p>
                                                    <p className="text-xs text-text-secondary">{stock.name}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-mono font-semibold text-red-400">{stock.changePercent.toFixed(2)}%</p>
                                                    <p className="text-xs text-text-secondary">${stock.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Most Active */}
                            <div className="bg-bg-secondary border border-border rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-accent-orange mb-4">Most Active</h3>
                                <div className="space-y-3">
                                    {filteredMovers.mostActive.slice(0, 10).map(stock => (
                                        <div
                                            key={stock.ticker}
                                            className="p-3 bg-bg-primary rounded border border-border/50 hover:border-accent-orange/50 transition cursor-pointer"
                                            onClick={() => navigate(`/stock/${stock.ticker}`)}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold">{stock.ticker}</p>
                                                    <p className="text-xs text-text-secondary">{formatVolume(stock.volume)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`font-mono font-semibold ${getPriceColor(stock.change)}`}>
                                                        {stock.change > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                                    </p>
                                                    <p className="text-xs text-text-secondary">${stock.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <StatusBar />
        </div>
    );
}
