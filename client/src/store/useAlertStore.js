import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAlertStore = create(
    persist(
        (set) => ({
            alerts: [],

            // Agregar alerta
            addAlert: (ticker, type, value) => set((state) => ({
                alerts: [
                    ...state.alerts,
                    {
                        id: Date.now().toString(),
                        ticker,
                        type, // 'price_above', 'price_below', 'volume_spike'
                        value,
                        triggered: false,
                        createdAt: new Date()
                    }
                ]
            })),

            // Eliminar alerta
            removeAlert: (id) => set((state) => ({
                alerts: state.alerts.filter(a => a.id !== id)
            })),

            // Marcar como disparada
            triggerAlert: (id) => set((state) => ({
                alerts: state.alerts.map(a =>
                    a.id === id ? { ...a, triggered: true } : a
                )
            })),

            // Obtener alertas activas para un ticker
            getAlerts: (ticker) => (state) =>
                state.alerts.filter(a => a.ticker === ticker && !a.triggered)
        }),
        { name: 'alerts-store' }
    )
);
