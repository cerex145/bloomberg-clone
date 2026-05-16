import newsService from '../services/news.service.js';

export async function getAllNews(req, res, next) {
    try {
        const { category } = req.query;
        const data = await newsService.getAllNews(category);
        res.json(data);
    } catch (err) {
        next(err);
    }
}

export async function getNewsByCategory(req, res, next) {
    try {
        const { category } = req.params;
        const data = await newsService.getNewsByCategory(category);
        res.json(data);
    } catch (err) {
        next(err);
    }
}

export default {
    getAllNews,
    getNewsByCategory
};
