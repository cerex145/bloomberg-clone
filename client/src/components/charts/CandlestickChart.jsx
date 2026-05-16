import { ComposedChart, Candlestick, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CandlestickChart({ data }) {
    if (!data || data.length === 0) {
        return <div className="bg-bg-secondary p-4 rounded text-text-muted">Sin datos disponibles</div>;
    }

    return (
        <div className="bg-bg-secondary border border-border-primary rounded p-4 w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4d" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        interval={Math.floor(data.length / 10)}
                    />
                    <YAxis
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        domain="dataMin - 1000 dataMax + 1000"
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0f1525',
                            border: '1px solid #1e2d4d',
                            borderRadius: '4px'
                        }}
                        labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Bar
                        dataKey="volume"
                        fill="#475569"
                        yAxisId="right"
                        opacity={0.3}
                    />
                    <Line
                        type="monotone"
                        dataKey="close"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
