"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clienteRoutes_1 = __importDefault(require("./routes/clienteRoutes"));
const categoriaRoutes_1 = __importDefault(require("./routes/categoriaRoutes"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno desde .env
dotenv_1.default.config();
// Crear una instancia de Express
const app = (0, express_1.default)();
// Crear una instancia de Prisma
const prisma = new client_1.PrismaClient();
// Middleware para parsear el cuerpo de las solicitudes a JSON
app.use(express_1.default.json());
// Middleware para permitir solicitudes CORS desde el frontend
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL || 'https://your-frontend.vercel.app' }));
// Conectar las rutas bajo el prefijo /api
app.use('/api', clienteRoutes_1.default);
app.use('/api', categoriaRoutes_1.default);
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de gestión de clientes!');
});
// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});
// Iniciar el servidor
const PORT = parseInt(process.env.PORT || '3000', 10);
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});
// Liberar recursos de Prisma al cerrar el servidor
process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    server.close();
});
