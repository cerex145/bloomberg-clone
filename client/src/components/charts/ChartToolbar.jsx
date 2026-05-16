import { useState } from 'react';

const intervals = [
    { label: '1D', value: '1d' },
    { label: '5D', value: '5d' },
    { label: '1M', value: '1m' },
    { label: '3M', value: '3m' },
    { label: '1Y', value: '1y' },
    { label: '5Y', value: '5y' }
];

export default function ChartToolbar({ selectedInterval, onIntervalChange, onAddIndicator }) {
    const [showIndicators, setShowIndicators] = useState(false);

    return (
        <div className="bg-bg-tertiary border-b border-border-primary p-3 flex items-center justify-between">
            <div className="flex gap-2">
                {intervals.map((interval) => (
                    <button
                        key={interval.value}
                        onClick={() => onIntervalChange(interval.value)}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${selectedInterval === interval.value
                                ? 'bg-accent-orange text-bg-primary'
                                : 'bg-bg-secondary text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        {interval.label}
                    </button>
                ))}
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => setShowIndicators(!showIndicators)}
                    className="px-3 py-1 text-xs font-medium bg-bg-secondary text-text-secondary hover:text-text-primary rounded transition-colors"
                >
                    📊 Indicadores
                </button>
            </div>
        </div>
    );
}
