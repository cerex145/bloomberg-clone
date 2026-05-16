import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePortfolioStore = create(
    persist(
        (set, get) => ({
            // Estado
            positions: [
                { ticker: 'AAPL', shares: 100, avgCost: 150.25, currentPrice: 182.34 },
                { ticker: 'MSFT', shares: 50, avgCost: 300.00, currentPrice: 412.18 },
                { ticker: 'GOOGL', shares: 30, avgCost: 120.00, currentPrice: 140.28 }
            ],
            cash: 50000,
            orders: [], // Histórico de órdenes

            // Acciones
            addPosition: (position) => set((state) => ({
                positions: [...state.positions, position]
            })),

            removePosition: (ticker) => set((state) => ({
                positions: state.positions.filter(p => p.ticker !== ticker)
            })),

            updatePosition: (ticker, updates) => set((state) => ({
                positions: state.positions.map(p =>
                    p.ticker === ticker ? { ...p, ...updates } : p
                )
            })),

            setCash: (amount) => set(() => ({
                cash: amount
            })),

            // Comprar acciones (paper trading)
            buyStock: (ticker, shares, price) => set((state) => {
                const cost = shares * price;
                if (cost > state.cash) {
                    return state; // No hay suficiente cash
                }

                const existingPosition = state.positions.find(p => p.ticker === ticker);
                let updatedPositions;

                if (existingPosition) {
                    const totalShares = existingPosition.shares + shares;
                    const totalCost = (existingPosition.shares * existingPosition.avgCost) + cost;
                    const newAvgCost = totalCost / totalShares;

                    updatedPositions = state.positions.map(p =>
                        p.ticker === ticker
                            ? { ...p, shares: totalShares, avgCost: newAvgCost }
                            : p
                    );
                } else {
                    updatedPositions = [...state.positions, {
                        ticker,
                        shares,
                        avgCost: price,
                        currentPrice: price
                    }];
                }

                return {
                    positions: updatedPositions,
                    cash: state.cash - cost,
                    orders: [
                        ...state.orders,
                        {
                            id: Date.now().toString(),
                            type: 'BUY',
                            ticker,
                            shares,
                            price,
                            totalValue: cost,
                            timestamp: new Date()
                        }
                    ]
                };
            }),

            // Vender acciones (paper trading)
            sellStock: (ticker, shares, price) => set((state) => {
                const position = state.positions.find(p => p.ticker === ticker);
                if (!position || position.shares < shares) {
                    return state; // No hay suficientes acciones
                }

                const proceeds = shares * price;
                let updatedPositions;

                if (position.shares === shares) {
                    updatedPositions = state.positions.filter(p => p.ticker !== ticker);
                } else {
                    updatedPositions = state.positions.map(p =>
                        p.ticker === ticker
                            ? { ...p, shares: p.shares - shares }
                            : p
                    );
                }

                return {
                    positions: updatedPositions,
                    cash: state.cash + proceeds,
                    orders: [
                        ...state.orders,
                        {
                            id: Date.now().toString(),
                            type: 'SELL',
                            ticker,
                            shares,
                            price,
                            totalValue: proceeds,
                            timestamp: new Date()
                        }
                    ]
                };
            }),

            getPortfolioValue: () => {
                const state = get();
                const positions_value = state.positions.reduce((total, pos) => {
                    return total + (pos.shares * pos.currentPrice);
                }, 0);
                return positions_value + state.cash;
            },

            getPortfolioReturn: () => {
                const state = get();
                const positions_cost = state.positions.reduce((total, pos) => {
                    return total + (pos.shares * pos.avgCost);
                }, 0);
                const initial = positions_cost + state.cash;
                const current = state.positions.reduce((total, pos) => {
                    return total + (pos.shares * pos.currentPrice);
                }, 0) + state.cash;
                return current - initial;
            },

            getRecentOrders: () => {
                const state = get();
                const orders = state.orders || [];
                return orders.slice(-10).reverse();
            }
        }),
        {
            name: 'portfolio-store'
        }
    )
);

export default usePortfolioStore;
