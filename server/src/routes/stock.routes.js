import express from 'express';
import stockController from '../controllers/stock.controller.js';

const router = express.Router();

router.get('/:ticker', stockController.getStockDetail);
router.get('/:ticker/chart', stockController.getStockChart);
router.get('/:ticker/news', stockController.getStockNews);
router.get('/:ticker/options', stockController.getStockOptions);

export default router;
