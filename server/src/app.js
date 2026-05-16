import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { setupMarketSocket } from './sockets/marketSocket.js';
import marketRoutes from './routes/market.routes.js';
import stockRoutes from './routes/stock.routes.js';
import newsRoutes from './routes/news.routes.js';
import screenerRoutes from './routes/screener.routes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
// CORS_ORIGIN puede ser una sola URL o una lista separada por comas
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map(o => o.trim());

const corsOptions = {
    origin: (origin, callback) => {
        // Permitir peticiones sin origin (Postman, curl, etc.) en dev
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS: origin '${origin}' not allowed`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
};

const io = new Server(server, {
    cors: corsOptions
});

// Middleware de seguridad
app.use(helmet());
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.'
});
app.use('/api/', limiter);

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/market', marketRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/screener', screenerRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// WebSocket setup
setupMarketSocket(io);

// Error handler middleware
app.use(errorHandler);

export { app, server, io };
