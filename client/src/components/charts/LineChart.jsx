import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomLineTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    const change = data.close - data.open;
    const changePercent = ((change / data.open) * 100).toFixed(2);
    const isPositive = change >= 0;

    return (
        <div className="bg-bg-primary border border-accent-orange rounded p-3 shadow-lg">
            <p className="text-text-secondary text-xs mb-2 font-bold">{data.date}</p>
            <div className="space-y-1 text-xs">
                <div className="flex justify-between gap-4">
                    <span className="text-text-secondary">Open:</span>
                    <span className="text-text-primary font-mono">${data.open?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4">
                    <span className="text-text-secondary">High:</span>
                    <span className="text-text-primary font-mono">${data.high?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4">
                    <span className="text-text-secondary">Low:</span>
                    <span className="text-text-primary font-mono">${data.low?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4 border-t border-border-primary pt-1 mt-1">
                    <span className="text-text-secondary">Close:</span>
                    <span className="font-bold font-mono">${data.close?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4">
                    <span className="text-text-secondary">Vol:</span>
                    <span className="text-text-primary font-mono">{(data.volume / 1000000).toFixed(1)}M</span>
                </div>
                <div className={`flex justify-between gap-4 pt-1 border-t border-border-primary mt-1 font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    <span>{isPositive ? '📈' : '📉'} Change:</span>
                    <span className="font-mono">{isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent}%)</span>
                </div>
            </div>
        </div>
    );
};

export default function LineChartComponent({ data, dataKey = 'close' }) {
    if (!data || data.length === 0) {
        return <div className="bg-bg-secondary p-4 rounded text-text-muted">Sin datos disponibles</div>;
    }

    return (
        <div className="bg-bg-secondary border border-border-primary rounded p-4 w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4d" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        interval={Math.floor(data.length / 10)}
                    />
                    <YAxis
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomLineTooltip />} cursor={{ stroke: '#f97316', strokeWidth: 1 }} />
                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
