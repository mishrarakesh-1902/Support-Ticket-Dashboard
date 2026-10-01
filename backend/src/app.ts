import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ticketRoutes from './routes/ticket.routes.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Base Health Check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Support Ticket API is running' });
});

// Mount Ticket API routes under /api/tickets
app.use('/api/tickets', ticketRoutes);

// 404 Handler for undefined routes
app.use(notFoundHandler);

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
