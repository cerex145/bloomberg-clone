import { create } from 'zustand';

export const useMarketStore = create((set) => ({
    // Estado
    prices: {},
    indexes: [],
    lastUpdate: null,

    // Acciones
    updatePrices: (updates) => set((state) => ({
        prices: {
            ...state.prices,
            ...updates.reduce((acc, update) => {
                acc[update.ticker] = {
                    price: update.price,
                    change: update.change,
                    changePercent: update.changePercent,
                    volume: update.volume,
                    timestamp: update.timestamp
                };
                return acc;
            }, {})
        },
        lastUpdate: new Date().toISOString()
    })),

    updateIndexes: (indexes) => set(() => ({
        indexes,
        lastUpdate: new Date().toISOString()
    })),

    getPrice: (ticker) => (state) => state.prices[ticker],

    resetPrices: () => set(() => ({
        prices: {},
        indexes: [],
        lastUpdate: null
    }))
}));

export default useMarketStore;
