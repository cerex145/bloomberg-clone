import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp } from 'lucide-react';

const AVAILABLE_STOCKS = [
    { ticker: 'AAPL', name: 'Apple Inc.' },
    { ticker: 'MSFT', name: 'Microsoft Corporation' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.' },
    { ticker: 'NVDA', name: 'NVIDIA Corporation' },
    { ticker: 'TSLA', name: 'Tesla Inc.' },
    { ticker: 'META', name: 'Meta Platforms' },
    { ticker: 'JPM', name: 'JPMorgan Chase' },
    { ticker: 'V', name: 'Visa Inc.' },
    { ticker: 'UNH', name: 'UnitedHealth Group' },
];

export default function CommandBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();

    const filteredStocks = useMemo(() => {
        if (!input) return AVAILABLE_STOCKS;
        return AVAILABLE_STOCKS.filter(stock =>
            stock.ticker.toUpperCase().includes(input.toUpperCase()) ||
            stock.name.toUpperCase().includes(input.toUpperCase())
        );
    }, [input]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
                setInput('');
                setSelected(0);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSelect = (ticker) => {
        navigate(`/stock/${ticker}`);
        setIsOpen(false);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelected(Math.min(selected + 1, filteredStocks.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelected(Math.max(selected - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredStocks[selected]) {
                handleSelect(filteredStocks[selected].ticker);
            }
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-20 right-4 z-30 bg-accent-orange text-bg-primary px-3 py-2 rounded text-xs font-bold hover:opacity-90 transition-opacity"
            >
                ⌘K
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50" onClick={() => setIsOpen(false)}>
            <div className="bg-bg-secondary border border-border-primary rounded-lg w-96 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Input Section */}
                <div className="flex items-center gap-3 p-4 border-b border-border-primary">
                    <Search size={20} className="text-text-secondary" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search stocks (AAPL, MSFT, etc)..."
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setSelected(0);
                        }}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-text-primary focus:outline-none text-sm"
                    />
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-text-muted hover:text-text-primary"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto">
                    {filteredStocks.length > 0 ? (
                        <div className="divide-y divide-border-primary">
                            {filteredStocks.map((stock, idx) => (
                                <button
                                    key={stock.ticker}
                                    onClick={() => handleSelect(stock.ticker)}
                                    className={`w-full px-4 py-3 text-left hover:bg-bg-tertiary transition flex items-center gap-3 ${idx === selected ? 'bg-bg-tertiary' : ''
                                        }`}
                                >
                                    <div className={`p-2 rounded ${idx === selected ? 'bg-accent-orange/20' : 'bg-bg-primary'}`}>
                                        <TrendingUp size={16} className={idx === selected ? 'text-accent-orange' : 'text-text-secondary'} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-text-primary">{stock.ticker}</p>
                                        <p className="text-xs text-text-secondary truncate">{stock.name}</p>
                                    </div>
                                    <span className="text-xs text-text-muted">↵</span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <p className="text-text-secondary text-sm">No stocks found</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-border-primary bg-bg-primary text-xs text-text-muted flex justify-between">
                    <span>↑↓ Navigate</span>
                    <span>↵ Select</span>
                    <span>Esc Close</span>
                </div>
            </div>
        </div>
    );
}
