import express from "express"
import {
  crearClienteHandler,
  obtenerClientesHandler,
  obtenerClientePorIdHandler,
  actualizarClienteHandler,
  eliminarClienteHandler,
} from "../controllers/clienteController"
import { authenticateToken, requireOperadorOrAdmin, requireAnyRole } from "../middleware/authMiddleware"

const router = express.Router()

// Todas las rutas requieren autenticación
router.use(authenticateToken)

// Rutas que requieren permisos de OPERADOR o ADMIN (crear/editar)
router.post("/clientes", requireOperadorOrAdmin, crearClienteHandler)
router.put("/clientes/:id", requireOperadorOrAdmin, actualizarClienteHandler)
router.delete("/clientes/:id", requireOperadorOrAdmin, eliminarClienteHandler)

// Rutas que permiten cualquier rol autenticado (leer)
router.get("/clientes", requireAnyRole, obtenerClientesHandler)
router.get("/clientes/:id", requireAnyRole, obtenerClientePorIdHandler)

export default router
