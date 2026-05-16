import { formatCurrency, formatPercent, formatVolume } from '../../utils/formatters';
import { getPriceColor } from '../../utils/colors';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketCard({ ticker, name, price, change, changePercent, volume }) {
    const colorClass = getPriceColor(change);

    return (
        <div className="bg-bg-secondary border border-border-primary rounded p-3 hover:bg-bg-tertiary transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h3 className="font-bold text-text-primary text-sm">{ticker}</h3>
                    <p className="text-text-secondary text-xs">{name}</p>
                </div>
                {change > 0 ? (
                    <TrendingUp size={16} className="text-price-green" />
                ) : (
                    <TrendingDown size={16} className="text-price-red" />
                )}
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                    <span className="font-mono text-text-primary font-bold text-base">{formatCurrency(price)}</span>
                    <span className={`font-mono text-sm ${colorClass}`}>{formatPercent(changePercent)}</span>
                </div>
                <div className="text-xs text-text-muted">
                    Vol: {formatVolume(volume)}
                </div>
            </div>
        </div>
    );
}
