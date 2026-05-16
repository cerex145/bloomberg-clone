import express from 'express';
import marketController from '../controllers/market.controller.js';

const router = express.Router();

router.get('/overview', marketController.getMarketOverview);
router.get('/sectors', marketController.getMarketSectors);
router.get('/movers', marketController.getMarketMovers);

export default router;
