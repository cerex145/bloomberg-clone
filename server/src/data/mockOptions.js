// Generar cadena de opciones realista para AAPL
function generateOptionsChain(underlyingPrice, expirationDays) {
    const strikes = [];
    const atm = Math.floor(underlyingPrice / 5) * 5; // Redondear al 5 más cercano

    // Strikes típicamente ±10-15% del precio actual
    for (let i = -7; i <= 7; i++) {
        strikes.push(atm + (i * 5));
    }

    const chain = strikes.map(strike => {
        const moneyness = (underlyingPrice - strike) / underlyingPrice;
        const timeValue = expirationDays / 365;

        // Volatilidad implícita más alta para OTM
        let iv = 0.25 + Math.abs(moneyness) * 0.1;

        // Precios aproximados usando modelo Black-Scholes simplificado
        const callPrice = Math.max(underlyingPrice - strike, 0) + iv * underlyingPrice * Math.sqrt(timeValue);
        const putPrice = Math.max(strike - underlyingPrice, 0) + iv * underlyingPrice * Math.sqrt(timeValue);

        const callBid = Math.round(callPrice * 0.95 * 100) / 100;
        const callAsk = Math.round(callPrice * 1.05 * 100) / 100;
        const putBid = Math.round(putPrice * 0.95 * 100) / 100;
        const putAsk = Math.round(putPrice * 1.05 * 100) / 100;

        // Greeks aproximados
        const callDelta = Math.min(0.95, Math.max(0.05, 0.5 + moneyness));
        const putDelta = callDelta - 1;

        return {
            strike: strike,
            call: {
                bid: Math.max(callBid, 0.01),
                ask: callAsk,
                last: Math.round((callBid + callAsk) / 2 * 100) / 100,
                volume: Math.floor(Math.random() * 5000),
                openInterest: Math.floor(Math.random() * 50000 + 10000),
                impliedVolatility: (Math.round(iv * 1000) / 1000).toFixed(3),
                delta: Math.round(callDelta * 100) / 100,
                gamma: (Math.round(0.02 * 1000) / 1000).toFixed(3),
                theta: (Math.round(-0.03 * 1000) / 1000).toFixed(3),
                vega: (Math.round(0.15 * 1000) / 1000).toFixed(3)
            },
            put: {
                bid: Math.max(putBid, 0.01),
                ask: putAsk,
                last: Math.round((putBid + putAsk) / 2 * 100) / 100,
                volume: Math.floor(Math.random() * 3000),
                openInterest: Math.floor(Math.random() * 40000 + 5000),
                impliedVolatility: (Math.round(iv * 1000) / 1000).toFixed(3),
                delta: Math.round(putDelta * 100) / 100,
                gamma: (Math.round(0.02 * 1000) / 1000).toFixed(3),
                theta: (Math.round(-0.02 * 1000) / 1000).toFixed(3),
                vega: (Math.round(0.15 * 1000) / 1000).toFixed(3)
            },
            inTheMoney: strike < underlyingPrice
        };
    });

    return chain;
}

export const mockOptions = {
    'AAPL': [
        {
            expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            daysToExpiration: 7,
            chain: generateOptionsChain(182.34, 7)
        },
        {
            expirationDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            daysToExpiration: 14,
            chain: generateOptionsChain(182.34, 14)
        },
        {
            expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            daysToExpiration: 30,
            chain: generateOptionsChain(182.34, 30)
        },
        {
            expirationDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            daysToExpiration: 60,
            chain: generateOptionsChain(182.34, 60)
        },
        {
            expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            daysToExpiration: 90,
            chain: generateOptionsChain(182.34, 90)
        }
    ]
};

export default mockOptions;
