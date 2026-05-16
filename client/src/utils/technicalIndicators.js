/**
 * Indicadores Técnicos Básicos
 * SMA, RSI, MACD
 */

// Simple Moving Average
export function calculateSMA(data, period = 20) {
    const sma = [];
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            sma.push(null);
        } else {
            const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
            sma.push(sum / period);
        }
    }
    return sma;
}

// Relative Strength Index
export function calculateRSI(data, period = 14) {
    const rsi = [];

    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            rsi.push(null);
            continue;
        }

        const prices = data.slice(i - period, i + 1);
        let gains = 0, losses = 0;

        for (let j = 1; j < prices.length; j++) {
            const diff = prices[j] - prices[j - 1];
            if (diff > 0) gains += diff;
            else losses += Math.abs(diff);
        }

        const avgGain = gains / period;
        const avgLoss = losses / period;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        const rsiValue = 100 - (100 / (1 + rs));

        rsi.push(rsiValue);
    }

    return rsi;
}

// MACD (Moving Average Convergence Divergence)
export function calculateMACD(data, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
    const ema12 = calculateEMA(data, fastPeriod);
    const ema26 = calculateEMA(data, slowPeriod);

    const macdLine = ema12.map((val, i) => val !== null && ema26[i] !== null ? val - ema26[i] : null);
    const signalLine = calculateEMA(macdLine.filter(v => v !== null), signalPeriod);

    const histogram = macdLine.map((val, i) => {
        if (val === null) return null;
        const signalIdx = i - (macdLine.length - signalLine.length);
        return signalIdx >= 0 ? val - signalLine[signalIdx] : null;
    });

    return { macdLine, signalLine, histogram };
}

// Exponential Moving Average (helper)
function calculateEMA(data, period) {
    const ema = [];
    const multiplier = 2 / (period + 1);

    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            const sum = data.slice(0, period).reduce((a, b) => a + (b || 0), 0);
            ema.push(sum / period);
        } else if (i < period) {
            ema.push(null);
        } else {
            const prevEMA = ema[i - 1];
            if (prevEMA !== null && data[i] !== null) {
                ema.push(data[i] * multiplier + prevEMA * (1 - multiplier));
            } else {
                ema.push(null);
            }
        }
    }

    return ema;
}

// Bollinger Bands
export function calculateBollingerBands(data, period = 20, stdDev = 2) {
    const sma = calculateSMA(data, period);
    const bands = [];

    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            bands.push(null);
        } else {
            const prices = data.slice(i - period + 1, i + 1);
            const mean = prices.reduce((a, b) => a + b, 0) / period;
            const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / period;
            const std = Math.sqrt(variance);

            bands.push({
                upper: sma[i] + (std * stdDev),
                middle: sma[i],
                lower: sma[i] - (std * stdDev)
            });
        }
    }

    return bands;
}

// ATR (Average True Range)
export function calculateATR(data, period = 14) {
    const atr = [];

    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            atr.push(Math.abs(data[i].high - data[i].low));
        } else if (i < period - 1) {
            atr.push(null);
        } else {
            let trSum = 0;
            for (let j = i - period + 1; j <= i; j++) {
                const tr = Math.max(
                    data[j].high - data[j].low,
                    Math.abs(data[j].high - data[j - 1].close),
                    Math.abs(data[j].low - data[j - 1].close)
                );
                trSum += tr;
            }
            atr.push(trSum / period);
        }
    }

    return atr;
}
