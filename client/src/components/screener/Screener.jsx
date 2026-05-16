import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import api from '../../services/api';
import { formatCurrency, formatNumber, formatPercent, formatMarketCap } from '../../utils/formatters';
import { getPriceColor } from '../../utils/colors';

const SECTORS = ['Technology', 'Healthcare', 'Financials', 'Energy', 'Industrials', 'Consumer Discretionary'];

export default function Screener() {
    const [stocks, setStocks] = useState([]);
    const [filters, setFilters] = useState({
        sector: '',
        minPrice: '',
        maxPrice: '',
        minMarketCap: '',
        minPE: '',
        maxPE: ''
    });
    const [loading, setLoading] = useState(false);

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const applyFilters = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.sector) params.append('sector', filters.sector);
            if (filters.minPrice) params.append('minPrice', filters.minPrice);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
            if (filters.minMarketCap) params.append('minMarketCap', filters.minMarketCap);
            if (filters.minPE) params.append('minPE', filters.minPE);
            if (filters.maxPE) params.append('maxPE', filters.maxPE);

            const { data } = await api.get(`/screener?${params.toString()}`);
            setStocks(data);
        } catch (error) {
            console.error('Error fetching screener data:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetFilters = () => {
        setFilters({
            sector: '',
            minPrice: '',
            maxPrice: '',
            minMarketCap: '',
            minPE: '',
            maxPE: ''
        });
        setStocks([]);
    };

    return (
        <div className="bg-bg-secondary border border-border-primary rounded">
            <div className="bg-bg-tertiary border-b border-border-primary p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                    <select
                        value={filters.sector}
                        onChange={(e) => handleFilterChange('sector', e.target.value)}
                        className="bg-bg-primary border border-border-primary text-text-primary text-sm rounded px-3 py-2 focus:outline-none focus:border-accent-orange"
                    >
                        <option value="">Todos los sectores</option>
                        {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <input
                        type="number"
                        placeholder="Min P/E"
                        value={filters.minPE}
                        onChange={(e) => handleFilterChange('minPE', e.target.value)}
                        className="bg-bg-primary border border-border-primary text-text-primary text-sm rounded px-3 py-2 focus:outline-none focus:border-accent-orange"
                    />

                    <input
                        type="number"
                        placeholder="Max P/E"
                        value={filters.maxPE}
                        onChange={(e) => handleFilterChange('maxPE', e.target.value)}
                        className="bg-bg-primary border border-border-primary text-text-primary text-sm rounded px-3 py-2 focus:outline-none focus:border-accent-orange"
                    />

                    <input
                        type="number"
                        placeholder="Min Price"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        className="bg-bg-primary border border-border-primary text-text-primary text-sm rounded px-3 py-2 focus:outline-none focus:border-accent-orange"
                    />

                    <button
                        onClick={applyFilters}
                        className="bg-accent-orange text-bg-primary font-semibold rounded px-3 py-2 hover:opacity-90 transition-opacity text-sm"
                    >
                        Buscar
                    </button>

                    <button
                        onClick={resetFilters}
                        className="bg-bg-primary border border-border-primary text-text-secondary rounded px-3 py-2 hover:text-text-primary transition-colors text-sm"
                    >
                        Limpiar
                    </button>
                </div>
            </div>

            <table className="w-full text-sm">
                <thead className="bg-bg-tertiary border-b border-border-primary">
                    <tr>
                        <th className="px-4 py-2 text-left text-text-secondary">Ticker</th>
                        <th className="px-4 py-2 text-right text-text-secondary">Precio</th>
                        <th className="px-4 py-2 text-right text-text-secondary">Cambio %</th>
                        <th className="px-4 py-2 text-right text-text-secondary">Market Cap</th>
                        <th className="px-4 py-2 text-right text-text-secondary">P/E</th>
                        <th className="px-4 py-2 text-right text-text-secondary">Div Yield</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-primary">
                    {stocks.map((stock) => (
                        <tr key={stock.ticker} className="hover:bg-bg-tertiary transition-colors cursor-pointer">
                            <td className="px-4 py-2 text-text-primary font-bold">{stock.ticker}</td>
                            <td className="px-4 py-2 text-right font-mono text-text-primary">{formatCurrency(stock.price)}</td>
                            <td className={`px-4 py-2 text-right font-mono ${getPriceColor(stock.changePercent)}`}>{formatPercent(stock.changePercent)}</td>
                            <td className="px-4 py-2 text-right text-text-secondary">{formatMarketCap(stock.marketCap)}</td>
                            <td className="px-4 py-2 text-right text-text-primary font-mono">{stock.peRatio ? formatNumber(stock.peRatio, 2) : 'N/A'}</td>
                            <td className="px-4 py-2 text-right text-text-secondary">{formatPercent(stock.dividendYield)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {stocks.length === 0 && !loading && (
                <div className="p-8 text-center text-text-muted">
                    {loading ? 'Cargando...' : 'Aplica filtros para ver resultados'}
                </div>
            )}
        </div>
    );
}
