import useWatchlistStore from '../../store/useWatchlistStore';
import { useMarketOverview } from '../../hooks/useMarketData';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { getPriceColor } from '../../utils/colors';
import { Trash2 } from 'lucide-react';

export default function Watchlist() {
    const watchlists = useWatchlistStore((state) => state.watchlists);
    const activeWatchlist = useWatchlistStore((state) => state.activeWatchlist);
    const removeTickerFromWatchlist = useWatchlistStore((state) => state.removeTickerFromWatchlist);

    const tickers = watchlists[activeWatchlist] || [];

    return (
        <div className="bg-bg-secondary border border-border-primary rounded overflow-hidden h-full flex flex-col">
            <div className="bg-bg-tertiary border-b border-border-primary p-3">
                <h2 className="text-text-primary font-bold text-sm">Watchlist ({tickers.length})</h2>
            </div>

            <div className="overflow-y-auto flex-1 divide-y divide-border-primary">
                {tickers.length === 0 ? (
                    <div className="p-4 text-text-muted text-center text-xs">Sin tickers en la watchlist</div>
                ) : (
                    tickers.map((ticker) => (
                        <div key={ticker} className="p-3 hover:bg-bg-tertiary transition-colors flex items-center justify-between group">
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-text-primary text-sm">{ticker}</div>
                                <div className="text-text-muted text-xs">$0.00</div>
                            </div>
                            <button
                                onClick={() => removeTickerFromWatchlist(activeWatchlist, ticker)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-text-muted hover:text-price-red"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
