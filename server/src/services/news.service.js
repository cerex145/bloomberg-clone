import { mockNews } from '../data/mockNews.js';

const USE_REAL_API = process.env.DATA_PROVIDER !== 'mock';

export async function getAllNews(category = 'all') {
    if (USE_REAL_API) {
        // Llamada real aquí
    }

    if (category === 'all') {
        return mockNews;
    }

    return mockNews.filter(article => article.category === category);
}

export async function getNewsByCategory(category) {
    if (USE_REAL_API) {
        // Llamada real aquí
    }

    return mockNews.filter(article => article.category === category);
}

export default {
    getAllNews,
    getNewsByCategory
};
