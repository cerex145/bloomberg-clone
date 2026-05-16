import express from 'express';
import screenerController from '../controllers/screener.controller.js';

const router = express.Router();

router.get('/', screenerController.screenerStocks);

export default router;
