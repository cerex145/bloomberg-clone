import stockService from '../services/stock.service.js';

export async function getStockDetail(req, res, next) {
    try {
        const { ticker } = req.params;
        const data = await stockService.getStockDetail(ticker);
        res.json(data);
    } catch (err) {
        next(err);
    }
}

export async function getStockChart(req, res, next) {
    try {
        const { ticker } = req.params;
        const { interval } = req.query;
        const data = await stockService.getStockChart(ticker, interval);
        res.json(data);
    } catch (err) {
        next(err);
    }
}

export async function getStockNews(req, res, next) {
    try {
        const { ticker } = req.params;
        const data = await stockService.getStockNews(ticker);
        res.json(data);
    } catch (err) {
        next(err);
    }
}

export async function getStockOptions(req, res, next) {
    try {
        const { ticker } = req.params;
        const data = await stockService.getStockOptions(ticker);
        res.json(data);
    } catch (err) {
        next(err);
    }
}

export default {
    getStockDetail,
    getStockChart,
    getStockNews,
    getStockOptions
};
