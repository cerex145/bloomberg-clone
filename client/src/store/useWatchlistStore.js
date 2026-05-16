import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWatchlistStore = create(
    persist(
        (set) => ({
            // Estado
            watchlists: {
                'default': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA']
            },
            activeWatchlist: 'default',

            // Acciones
            createWatchlist: (name) => set((state) => ({
                watchlists: {
                    ...state.watchlists,
                    [name]: []
                }
            })),

            addTickerToWatchlist: (watchlistName, ticker) => set((state) => ({
                watchlists: {
                    ...state.watchlists,
                    [watchlistName]: [...(state.watchlists[watchlistName] || []), ticker]
                }
            })),

            removeTickerFromWatchlist: (watchlistName, ticker) => set((state) => ({
                watchlists: {
                    ...state.watchlists,
                    [watchlistName]: state.watchlists[watchlistName].filter(t => t !== ticker)
                }
            })),

            setActiveWatchlist: (name) => set(() => ({
                activeWatchlist: name
            })),

            getWatchlistTickers: () => (state) => {
                return state.watchlists[state.activeWatchlist] || [];
            },

            deleteWatchlist: (name) => set((state) => {
                const { [name]: _, ...rest } = state.watchlists;
                return {
                    watchlists: rest,
                    activeWatchlist: state.activeWatchlist === name ? 'default' : state.activeWatchlist
                };
            })
        }),
        {
            name: 'watchlist-store'
        }
    )
);

export default useWatchlistStore;
