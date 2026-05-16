import React, { useMemo } from 'react';
import { calculateRSI, calculateSMA, calculateMACD } from '../../utils/technicalIndicators';
import { TrendingUp } from 'lucide-react';

export default function TechnicalAnalysis({ chartData }) {
    if (!chartData || chartData.length === 0) return null;

    const closePrices = chartData.map(d => d.close);

    // Calcular indicadores
    const sma20 = useMemo(() => calculateSMA(closePrices, 20), [closePrices]);
    const sma50 = useMemo(() => calculateSMA(closePrices, 50), [closePrices]);
    const rsi = useMemo(() => calculateRSI(closePrices, 14), [closePrices]);
    const macd = useMemo(() => calculateMACD(closePrices), [closePrices]);

    // Últimos valores
    const lastRSI = rsi[rsi.length - 1];
    const lastSMA20 = sma20[sma20.length - 1];
    const lastSMA50 = sma50[sma50.length - 1];
    const lastPrice = closePrices[closePrices.length - 1];
    const lastMACD = macd.macdLine[macd.macdLine.length - 1];
    const lastSignal = macd.signalLine[macd.signalLine.length - 1];

    // Determinar señales
    const rsiSignal = !lastRSI ? 'neutral' : lastRSI > 70 ? 'overbought' : lastRSI < 30 ? 'oversold' : 'neutral';
    const macdSignal = lastMACD > lastSignal ? 'bullish' : 'bearish';
    const smaTrend = lastPrice > lastSMA20 ? lastSMA20 > lastSMA50 ? 'strong_up' : 'up' : 'down';

    return (
        <div className="bg-bg-secondary border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-accent-orange" />
                <h3 className="font-semibold text-text-primary">Technical Analysis</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* RSI */}
                <div className={`rounded p-4 border-l-4 ${rsiSignal === 'overbought' ? 'bg-red-900/20 border-red-500' :
                        rsiSignal === 'oversold' ? 'bg-green-900/20 border-green-500' :
                            'bg-bg-primary border-yellow-500'
                    }`}>
                    <p className="text-text-secondary text-xs mb-2 font-bold uppercase">RSI (14)</p>
                    <p className={`font-mono text-lg font-bold ${rsiSignal === 'overbought' ? 'text-red-400' :
                            rsiSignal === 'oversold' ? 'text-green-400' :
                                'text-text-primary'
                        }`}>
                        {lastRSI ? lastRSI.toFixed(1) : 'N/A'}
                    </p>
                    <p className={`text-xs mt-2 font-semibold ${rsiSignal === 'overbought' ? 'text-red-300' :
                            rsiSignal === 'oversold' ? 'text-green-300' :
                                'text-yellow-300'
                        }`}>
                        {rsiSignal === 'overbought' && '⚠️ Overbought'}
                        {rsiSignal === 'oversold' && '✓ Oversold'}
                        {rsiSignal === 'neutral' && '─ Neutral'}
                    </p>
                </div>

                {/* SMA 20 */}
                <div className={`rounded p-4 border-l-4 ${lastPrice > lastSMA20 ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'
                    }`}>
                    <p className="text-text-secondary text-xs mb-2 font-bold uppercase">SMA 20</p>
                    <p className={`font-mono text-lg font-bold ${lastPrice > lastSMA20 ? 'text-green-400' : 'text-red-400'}`}>
                        ${lastSMA20 ? lastSMA20.toFixed(2) : 'N/A'}
                    </p>
                    <p className={`text-xs mt-2 font-semibold ${lastPrice > lastSMA20 ? 'text-green-300' : 'text-red-300'}`}>
                        {lastPrice > lastSMA20 ? '✓ Above' : '✗ Below'}
                    </p>
                </div>

                {/* SMA 50 */}
                <div className={`rounded p-4 border-l-4 ${smaTrend === 'strong_up' ? 'bg-green-900/20 border-green-500' :
                        smaTrend === 'up' ? 'bg-blue-900/20 border-blue-500' :
                            'bg-red-900/20 border-red-500'
                    }`}>
                    <p className="text-text-secondary text-xs mb-2 font-bold uppercase">SMA 50</p>
                    <p className={`font-mono text-lg font-bold ${smaTrend === 'strong_up' ? 'text-green-400' :
                            smaTrend === 'up' ? 'text-blue-400' :
                                'text-red-400'
                        }`}>
                        ${lastSMA50 ? lastSMA50.toFixed(2) : 'N/A'}
                    </p>
                    <p className={`text-xs mt-2 font-semibold ${smaTrend === 'strong_up' ? 'text-green-300' :
                            smaTrend === 'up' ? 'text-blue-300' :
                                'text-red-300'
                        }`}>
                        {smaTrend === 'strong_up' ? '💪 Strong ↑' : smaTrend === 'up' ? '📈 Up ↑' : '📉 Down ↓'}
                    </p>
                </div>

                {/* MACD */}
                <div className={`rounded p-4 border-l-4 ${macdSignal === 'bullish' ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'
                    }`}>
                    <p className="text-text-secondary text-xs mb-2 font-bold uppercase">MACD</p>
                    <p className={`font-mono text-lg font-bold ${macdSignal === 'bullish' ? 'text-green-400' : 'text-red-400'}`}>
                        {lastMACD ? lastMACD.toFixed(4) : 'N/A'}
                    </p>
                    <p className={`text-xs mt-2 font-semibold ${macdSignal === 'bullish' ? 'text-green-300' : 'text-red-300'}`}>
                        {macdSignal === 'bullish' ? '✓ Bullish' : '✗ Bearish'}
                    </p>
                </div>
            </div>

            {/* Summary */}
            <div className="mt-4 p-3 bg-bg-primary rounded border-l-2 border-accent-orange">
                <p className="text-xs text-text-secondary mb-2">
                    <strong>Signal Summary:</strong>
                </p>
                <ul className="text-xs text-text-secondary space-y-1">
                    <li>✓ RSI: {rsiSignal === 'neutral' ? 'Neutral zone' : rsiSignal === 'overbought' ? 'Overbought - potential pullback' : 'Oversold - potential bounce'}</li>
                    <li>✓ Trend: {smaTrend === 'strong_up' ? 'Strong uptrend' : smaTrend === 'up' ? 'Uptrend' : 'Downtrend'}</li>
                    <li>✓ Momentum: {macdSignal === 'bullish' ? 'Bullish momentum' : 'Bearish momentum'}</li>
                </ul>
            </div>
        </div>
    );
}
