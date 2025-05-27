import express from 'express';
import {
    getCategoriasHandler,
    crearCategoriaHandler,
    actualizarCategoriaHandler,
    eliminarCategoriaHandler,
} from '../controllers/categoriaController';

const router = express.Router();

router.get('/categorias', getCategoriasHandler);
router.post('/categorias', crearCategoriaHandler);
router.put('/categorias', actualizarCategoriaHandler);
router.delete('/categorias', eliminarCategoriaHandler);

export default router;
