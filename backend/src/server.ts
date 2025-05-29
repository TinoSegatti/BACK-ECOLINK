import express, { Request, Response, NextFunction } from 'express';
import clienteRoutes from './routes/clienteRoutes';
import categoriaRoutes from './routes/categoriaRoutes';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

// Crear instancia de Express
const app = express();

// Crear instancia de Prisma
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'https://front-ecolink-yvrknqku7-tinosegattis-projects.vercel.app',
    'http://localhost:3000', // Para desarrollo local
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rutas
app.use('/api/v1', clienteRoutes);
app.use('/api/v1', categoriaRoutes);

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('¡Bienvenido a la API de gestión de clientes!');
});

// Manejo de errores global
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

// Iniciar el servidor
const PORT: number = parseInt(process.env.PORT || '3000', 10);
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});

// Liberar recursos de Prisma al cerrar
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  server.close();
});