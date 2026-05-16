import { useParams } from 'react-router-dom';
import { useState } from 'react';
import TopBar from '../components/layout/TopBar';
import Sidebar from '../components/layout/Sidebar';
import StatusBar from '../components/layout/StatusBar';
import LineChartComponent from '../components/charts/LineChart';
import VolumeChart from '../components/charts/VolumeChart';
import ChartToolbar from '../components/charts/ChartToolbar';
import OptionsChain from '../components/options/OptionsChain';
import NewsFeed from '../components/news/NewsFeed';
import TradingPanel from '../components/trading/TradingPanel';
import OrderHistory from '../components/trading/OrderHistory';
import TechnicalAnalysis from '../components/analysis/TechnicalAnalysis';
import AlertManager from '../components/alerts/AlertManager';
import { useStockDetail, useStockChart, useStockNews } from '../hooks/useStockDetail';
import { formatCurrency, formatPercent, formatNumber, formatMarketCap } from '../utils/formatters';
import { getPriceColor } from '../utils/colors';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StockDetail() {
    const { ticker } = useParams();
    const [interval, setInterval] = useState('1d');

    const { data: stock, isLoading: stockLoading } = useStockDetail(ticker);
    const { data: chartData, isLoading: chartLoading } = useStockChart(ticker, interval);
    const { data: news, isLoading: newsLoading } = useStockNews(ticker);

    if (stockLoading) {
        return <div className="flex items-center justify-center h-screen text-text-muted">Cargando...</div>;
    }

    if (!stock) {
        return <div className="flex items-center justify-center h-screen text-text-muted">Stock no encontrado</div>;
    }

    const colorClass = getPriceColor(stock.change);

    return (
        <div className="bg-bg-primary text-text-primary min-h-screen">
            <TopBar />
            <Sidebar />

            <main className="pl-sidebar-width pt-topbar-height pb-statusbar-height">
                <div className="p-6">
                    {/* Header */}
                    <div className="bg-bg-secondary border border-border-primary rounded p-6 mb-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-text-primary">{stock.ticker}</h1>
                                <p className="text-text-secondary">{stock.name}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-mono font-bold text-text-primary">{formatCurrency(stock.price)}</div>
                                <div className={`text-lg font-mono font-bold flex items-center justify-end gap-2 ${colorClass}`}>
                                    {stock.change > 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                    {stock.change > 0 ? '+' : ''}{formatCurrency(stock.change)} ({formatPercent(stock.changePercent)})
                                </div>
                            </div>
                        </div>

                        {/* Fundamentals grid */}
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                                <span className="text-text-secondary text-xs">Market Cap</span>
                                <p className="text-text-primary font-bold">{formatMarketCap(stock.marketCap)}</p>
                            </div>
                            <div>
                                <span className="text-text-secondary text-xs">P/E Ratio</span>
                                <p className="text-text-primary font-bold">{formatNumber(stock.peRatio, 2)}</p>
                            </div>
                            <div>
                                <span className="text-text-secondary text-xs">EPS</span>
                                <p className="text-text-primary font-bold">{formatCurrency(stock.eps)}</p>
                            </div>
                            <div>
                                <span className="text-text-secondary text-xs">Dividend Yield</span>
                                <p className="text-text-primary font-bold">{formatPercent(stock.dividendYield)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Chart & Trading */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="lg:col-span-2">
                            <div className="bg-bg-secondary border border-border rounded rounded-b-none p-4">
                                <ChartToolbar selectedInterval={interval} onIntervalChange={setInterval} />
                            </div>
                            {chartData && <LineChartComponent data={chartData} dataKey="close" />}
                            {chartData && <VolumeChart data={chartData} />}
                        </div>

                        <div className="space-y-4">
                            {/* Stock Details */}
                            <div className="bg-bg-secondary border border-border-primary rounded p-4 space-y-3 text-sm">
                                <div>
                                    <span className="text-text-secondary">Sector</span>
                                    <p className="text-text-primary font-bold">{stock.sector}</p>
                                </div>
                                <div>
                                    <span className="text-text-secondary">Industry</span>
                                    <p className="text-text-primary font-bold">{stock.industry}</p>
                                </div>
                                <div>
                                    <span className="text-text-secondary">CEO</span>
                                    <p className="text-text-primary font-bold">{stock.ceo}</p>
                                </div>
                                <div>
                                    <span className="text-text-secondary">Employees</span>
                                    <p className="text-text-primary font-bold">{stock.employees.toLocaleString()}</p>
                                </div>
                                <div>
                                    <span className="text-text-secondary">Headquarters</span>
                                    <p className="text-text-primary font-bold">{stock.headquarters}</p>
                                </div>
                            </div>

                            {/* Trading Panel */}
                            <TradingPanel ticker={ticker} currentPrice={stock.price} />
                        </div>
                    </div>

                    {/* Technical Analysis & Alerts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {chartData && <TechnicalAnalysis chartData={chartData} />}
                        <AlertManager ticker={ticker} />
                    </div>

                    {/* Order History */}
                    <div className="mb-6">
                        <OrderHistory />
                    </div>

                    {/* Options & News */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <OptionsChain ticker={ticker} />
                        </div>
                        <div>
                            <NewsFeed category="markets" />
                        </div>
                    </div>
                </div>
            </main>

            <StatusBar />
        </div>
    );
}
