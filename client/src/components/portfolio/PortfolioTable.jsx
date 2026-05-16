import { formatCurrency, formatPercent } from '../../utils/formatters';
import { getPriceColor } from '../../utils/colors';
import { TrendingUp, TrendingDown, X } from 'lucide-react';
import usePortfolioStore from '../../store/usePortfolioStore';

export default function PortfolioTable() {
    const positions = usePortfolioStore((state) => state.positions);
    const removePosition = usePortfolioStore((state) => state.removePosition);

    const totalCost = positions.reduce((sum, pos) => sum + (pos.shares * pos.avgCost), 0);
    const totalValue = positions.reduce((sum, pos) => sum + (pos.shares * pos.currentPrice), 0);
    const totalReturn = totalValue - totalCost;
    const returnPercent = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0;

    return (
        <div className="bg-bg-secondary border border-border-primary rounded overflow-hidden">
            <div className="bg-bg-tertiary border-b border-border-primary p-4">
                <h2 className="text-text-primary font-bold">Posiciones (Total: {positions.length})</h2>
                <div className="text-text-secondary text-sm mt-2">
                    Valor: {formatCurrency(totalValue)} | P&L: <span className={getPriceColor(totalReturn)}>{formatCurrency(totalReturn)}</span> ({formatPercent(returnPercent)})
                </div>
            </div>

            <table className="w-full text-sm">
                <thead className="bg-bg-tertiary border-b border-border-primary">
                    <tr>
                        <th className="px-4 py-2 text-left text-text-secondary font-semibold">Ticker</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-semibold">Shares</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-semibold">Avg Cost</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-semibold">Precio</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-semibold">Valor</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-semibold">P&L</th>
                        <th className="px-4 py-2 text-center text-text-secondary font-semibold">Acción</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-primary">
                    {positions.map((pos) => {
                        const posValue = pos.shares * pos.currentPrice;
                        const posCost = pos.shares * pos.avgCost;
                        const posReturn = posValue - posCost;
                        const posReturnPercent = (posReturn / posCost) * 100;

                        return (
                            <tr key={pos.ticker} className="hover:bg-bg-tertiary transition-colors">
                                <td className="px-4 py-2 text-text-primary font-bold">{pos.ticker}</td>
                                <td className="px-4 py-2 text-right font-mono text-text-primary">{pos.shares}</td>
                                <td className="px-4 py-2 text-right font-mono text-text-secondary">{formatCurrency(pos.avgCost)}</td>
                                <td className="px-4 py-2 text-right font-mono text-text-primary font-bold">{formatCurrency(pos.currentPrice)}</td>
                                <td className="px-4 py-2 text-right font-mono text-text-primary">{formatCurrency(posValue)}</td>
                                <td className={`px-4 py-2 text-right font-mono flex items-center justify-end gap-1 ${getPriceColor(posReturn)}`}>
                                    {posReturn > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                    {formatCurrency(posReturn)} ({formatPercent(posReturnPercent)})
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => removePosition(pos.ticker)}
                                        className="text-text-muted hover:text-price-red transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
