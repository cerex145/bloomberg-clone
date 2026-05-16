import { useMarketOverview } from '../../hooks/useMarketData';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { getPriceColor } from '../../utils/colors';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketOverview() {
    const { data: indexes, isLoading } = useMarketOverview();

    if (isLoading) {
        return <div className="bg-bg-secondary p-4 rounded text-text-muted">Cargando índices...</div>;
    }

    return (
        <div className="bg-bg-secondary border border-border-primary rounded overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-bg-tertiary border-b border-border-primary">
                    <tr>
                        <th className="px-4 py-2 text-left text-text-secondary font-semibold">Índice</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-semibold">Precio</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-semibold">Cambio</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-semibold">%</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-semibold">YTD</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-primary">
                    {indexes?.map((idx) => (
                        <tr key={idx.id} className="hover:bg-bg-tertiary transition-colors">
                            <td className="px-4 py-2 text-text-primary font-medium">{idx.name}</td>
                            <td className="px-4 py-2 text-right font-mono text-text-primary font-bold">{formatCurrency(idx.value)}</td>
                            <td className={`px-4 py-2 text-right font-mono ${getPriceColor(idx.change)}`}>
                                {idx.change > 0 ? '+' : ''}{formatCurrency(idx.change)}
                            </td>
                            <td className={`px-4 py-2 text-right font-mono font-bold flex items-center justify-end gap-1 ${getPriceColor(idx.changePercent)}`}>
                                {idx.changePercent > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                {formatPercent(idx.changePercent)}
                            </td>
                            <td className={`px-4 py-2 text-right font-mono ${getPriceColor(idx.ytd)}`}>
                                {idx.ytd > 0 ? '+' : ''}{formatPercent(idx.ytd)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
