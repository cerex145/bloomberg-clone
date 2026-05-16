import express from 'express';
import newsController from '../controllers/news.controller.js';

const router = express.Router();

router.get('/', newsController.getAllNews);
router.get('/category/:category', newsController.getNewsByCategory);

export default router;
