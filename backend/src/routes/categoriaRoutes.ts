import express from "express"
import {
  getCategoriasHandler,
  crearCategoriaHandler,
  actualizarCategoriaHandler,
  eliminarCategoriaHandler,
} from "../controllers/categoriaController"
import { authenticateToken, requireAdmin, requireAnyRole } from "../middleware/authMiddleware"

const router = express.Router()

// Todas las rutas requieren autenticación
router.use(authenticateToken)

// Rutas que permiten cualquier rol autenticado (leer)
router.get("/categorias", requireAnyRole, getCategoriasHandler)

// Rutas que requieren permisos de ADMIN (crear/editar/eliminar categorías)
router.post("/categorias", requireAdmin, crearCategoriaHandler)
router.put("/categorias", requireAdmin, actualizarCategoriaHandler)
router.delete("/categorias", requireAdmin, eliminarCategoriaHandler)

export default router
