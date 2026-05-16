import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export function useNewsData(category = 'all') {
    return useQuery({
        queryKey: ['news', category],
        queryFn: async () => {
            const { data } = await api.get('/news', {
                params: { category: category === 'all' ? undefined : category }
            });
            return data;
        },
        staleTime: 120000,
        refetchInterval: 300000
    });
}

export function useNewsByCategory(category) {
    return useQuery({
        queryKey: ['news', 'category', category],
        queryFn: async () => {
            const { data } = await api.get(`/news/category/${category}`);
            return data;
        },
        enabled: !!category,
        staleTime: 120000,
        refetchInterval: 300000
    });
}
