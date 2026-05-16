import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomVolumeTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    const volumeM = (data.volume / 1000000).toFixed(1);
    const avgPrice = ((data.high + data.low) / 2).toFixed(2);
    const priceRange = (data.high - data.low).toFixed(2);

    return (
        <div className="bg-bg-primary border border-accent-orange rounded p-3 shadow-lg">
            <p className="text-text-secondary text-xs mb-2 font-bold">{data.date}</p>
            <div className="space-y-1 text-xs">
                <div className="flex justify-between gap-4">
                    <span className="text-text-secondary">Volume:</span>
                    <span className="text-text-primary font-mono font-bold">{volumeM}M shares</span>
                </div>
                <div className="flex justify-between gap-4">
                    <span className="text-text-secondary">Avg Price:</span>
                    <span className="text-text-primary font-mono">${avgPrice}</span>
                </div>
                <div className="flex justify-between gap-4 border-t border-border-primary pt-1 mt-1">
                    <span className="text-text-secondary">Range:</span>
                    <span className="text-text-primary font-mono">${priceRange}</span>
                </div>
                <div className="flex justify-between gap-4">
                    <span className="text-text-secondary">Close:</span>
                    <span className="font-bold font-mono">${data.close?.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default function VolumeChart({ data }) {
    if (!data || data.length === 0) {
        return <div className="bg-bg-secondary p-4 rounded text-text-muted">Sin datos disponibles</div>;
    }

    return (
        <div className="bg-bg-secondary border border-border-primary rounded p-4 w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4d" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        interval={Math.floor(data.length / 10)}
                    />
                    <YAxis
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomVolumeTooltip />} cursor={{ fill: 'rgba(249, 115, 22, 0.1)' }} />
                    <Bar
                        dataKey="volume"
                        fill="#f97316"
                        radius={[2, 2, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
