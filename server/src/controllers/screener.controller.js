import screenerService from '../services/screener.service.js';

export async function screenerStocks(req, res, next) {
    try {
        const filters = {
            sector: req.query.sector,
            minMarketCap: req.query.minMarketCap ? Number(req.query.minMarketCap) : null,
            minPE: req.query.minPE ? Number(req.query.minPE) : null,
            maxPE: req.query.maxPE ? Number(req.query.maxPE) : null,
            minPrice: req.query.minPrice ? Number(req.query.minPrice) : null,
            maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : null
        };

        const data = await screenerService.screenerStocks(filters);
        res.json(data);
    } catch (err) {
        next(err);
    }
}

export default {
    screenerStocks
};
