import marketService from '../services/market.service.js';

export async function getMarketOverview(req, res, next) {
    try {
        const data = await marketService.getMarketOverview();
        res.json(data);
    } catch (err) {
        next(err);
    }
}

export async function getMarketSectors(req, res, next) {
    try {
        const data = await marketService.getMarketSectors();
        res.json(data);
    } catch (err) {
        next(err);
    }
}

export async function getMarketMovers(req, res, next) {
    try {
        const data = await marketService.getMarketMovers();
        res.json(data);
    } catch (err) {
        next(err);
    }
}

export default {
    getMarketOverview,
    getMarketSectors,
    getMarketMovers
};
