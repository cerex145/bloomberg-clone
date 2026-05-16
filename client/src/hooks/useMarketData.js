import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export function useMarketOverview() {
    return useQuery({
        queryKey: ['marketOverview'],
        queryFn: async () => {
            const { data } = await api.get('/market/overview');
            return data;
        },
        staleTime: 60000, // 1 minuto
        refetchInterval: 60000
    });
}

export function useMarketSectors() {
    return useQuery({
        queryKey: ['marketSectors'],
        queryFn: async () => {
            const { data } = await api.get('/market/sectors');
            return data;
        },
        staleTime: 60000,
        refetchInterval: 60000
    });
}

export function useMarketMovers() {
    return useQuery({
        queryKey: ['marketMovers'],
        queryFn: async () => {
            const { data } = await api.get('/market/movers');
            return data;
        },
        staleTime: 60000,
        refetchInterval: 60000
    });
}
