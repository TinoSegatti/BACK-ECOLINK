import express from 'express';
import {
  crearClienteHandler,
  obtenerClientesHandler,
  obtenerClientePorIdHandler,
  actualizarClienteHandler,
  eliminarClienteHandler,
} from '../controllers/clienteController';

const router = express.Router();

router.post('/clientes', crearClienteHandler);
router.get('/clientes', obtenerClientesHandler);
router.get('/clientes/:id', obtenerClientePorIdHandler);
router.put('/clientes/:id', actualizarClienteHandler);
router.delete('/clientes/:id', eliminarClienteHandler);

export default router;