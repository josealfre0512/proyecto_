import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();

// Configuración avanzada de CORS para conectar con Next.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet());
app.use(express.json());

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Middleware Global de Errores
app.use(errorHandler);

export default app;