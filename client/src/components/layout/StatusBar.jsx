import { formatCurrency, formatPercent } from '../../utils/formatters';
import { getPriceColor } from '../../utils/colors';
import useMarketStore from '../../store/useMarketStore';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const KEY_INDEXES = ['^GSPC', '^NDX', '^DJI', 'VIX', 'DXY', 'BTC'];

export default function StatusBar() {
    const indexes = useMarketStore((state) => state.indexes);
    const [displayIndexes, setDisplayIndexes] = useState([]);

    useEffect(() => {
        if (indexes && indexes.length > 0) {
            const filtered = indexes.slice(0, 6);
            setDisplayIndexes(filtered);
        }
    }, [indexes]);

    return (
        <div className="fixed bottom-0 left-0 right-0 h-statusbar-height bg-bg-secondary border-t border-border-primary flex items-center px-4 gap-6 overflow-x-auto z-40 md:pl-sidebar-width">
            {displayIndexes.map((idx) => {
                const colorClass = getPriceColor(idx.change);

                return (
                    <div key={idx.id} className="flex items-center gap-2 min-w-max text-xs cursor-pointer hover:bg-bg-tertiary px-2 py-1 rounded transition-colors">
                        <span className="text-text-secondary font-medium">{idx.symbol || idx.name}</span>
                        <span className="font-mono text-text-primary">{formatCurrency(idx.value)}</span>
                        <div className={`flex items-center gap-1 ${colorClass}`}>
                            {idx.change > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            <span className="font-mono">{formatPercent(idx.changePercent, 2)}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
