import express from 'express';
import clienteRoutes from './routes/clienteRoutes'; // Importa las rutas de clientes
import categoriaRoutes from './routes/categoriaRoutes'; // Importa las rutas de categorías
import { PrismaClient } from '@prisma/client'; // Importa Prisma para la conexión a la base de datos
import cors from 'cors'; // Middleware para permitir solicitudes CORS
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

// Crear una instancia de Express
const app = express();

// Crear una instancia de Prisma
const prisma = new PrismaClient();

// Middleware para parsear el cuerpo de las solicitudes a JSON
app.use(express.json());

// Middleware para permitir solicitudes CORS
app.use(cors());

// Conectar las rutas bajo el prefijo /api
app.use('/api', clienteRoutes);
app.use('/api', categoriaRoutes); // Añade las rutas de categorías

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de gestión de clientes!');
});

// Manejo de errores global
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000; // Puerto del servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});