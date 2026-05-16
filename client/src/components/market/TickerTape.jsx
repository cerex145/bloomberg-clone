import { formatCurrency, formatPercent } from '../../utils/formatters';
import { getPriceColor } from '../../utils/colors';
import { useEffect, useRef } from 'react';

export default function TickerTape({ tickers }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scroll = scrollRef.current;
        if (!scroll) return;

        let scrollPos = 0;
        const animate = () => {
            scrollPos += 0.5;
            if (scrollPos > scroll.scrollWidth - scroll.clientWidth) {
                scrollPos = 0;
            }
            scroll.scrollLeft = scrollPos;
        };

        const interval = setInterval(animate, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-bg-secondary border-b border-border-primary overflow-hidden h-12 flex items-center">
            <div ref={scrollRef} className="flex gap-6 px-4 overflow-x-hidden scroll-smooth">
                {tickers?.map((ticker, idx) => (
                    <div key={`${ticker.ticker}-${idx}`} className="flex items-center gap-2 min-w-max">
                        <span className="font-bold text-text-primary text-sm">{ticker.ticker}</span>
                        <span className="font-mono text-text-primary font-medium">{formatCurrency(ticker.price)}</span>
                        <span className={`font-mono text-sm ${getPriceColor(ticker.change)}`}>
                            {formatPercent(ticker.changePercent)}
                        </span>
                    </div>
                ))}
                {tickers?.map((ticker, idx) => (
                    <div key={`${ticker.ticker}-dup-${idx}`} className="flex items-center gap-2 min-w-max">
                        <span className="font-bold text-text-primary text-sm">{ticker.ticker}</span>
                        <span className="font-mono text-text-primary font-medium">{formatCurrency(ticker.price)}</span>
                        <span className={`font-mono text-sm ${getPriceColor(ticker.change)}`}>
                            {formatPercent(ticker.changePercent)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
