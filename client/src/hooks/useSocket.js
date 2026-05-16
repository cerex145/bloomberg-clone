import { useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import useMarketStore from '../store/useMarketStore';

export function useSocket() {
    const socketRef = useRef(null);
    const updatePrices = useMarketStore((state) => state.updatePrices);
    const updateIndexes = useMarketStore((state) => state.updateIndexes);

    useEffect(() => {
        let WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:3001';
        if (WS_URL && !WS_URL.startsWith('http') && !WS_URL.startsWith('ws')) {
            WS_URL = `wss://${WS_URL}`;
        }

        socketRef.current = io(WS_URL, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5
        });

        socketRef.current.on('connect', () => {
            console.log('✅ WebSocket connected');
        });

        socketRef.current.on('price:update', (updates) => {
            updatePrices(updates);
        });

        socketRef.current.on('market:tick', (data) => {
            updateIndexes(data.indexes);
        });

        socketRef.current.on('disconnect', () => {
            console.log('❌ WebSocket disconnected');
        });

        socketRef.current.on('error', (error) => {
            console.error('WebSocket error:', error);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [updatePrices, updateIndexes]);

    const subscribe = useCallback((tickers) => {
        if (socketRef.current) {
            socketRef.current.emit('subscribe', { tickers });
        }
    }, []);

    const unsubscribe = useCallback((tickers) => {
        if (socketRef.current) {
            socketRef.current.emit('unsubscribe', { tickers });
        }
    }, []);

    return {
        socket: socketRef.current,
        subscribe,
        unsubscribe
    };
}

export default useSocket;
