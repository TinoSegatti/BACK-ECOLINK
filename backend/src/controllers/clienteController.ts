import { Request, Response } from 'express';
import {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
} from '../services/clienteService';
import { createClienteSchema, updateClienteSchema } from '../validators/clienteValidator';
import { ZodError } from 'zod';

export const crearClienteHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Cuerpo de la solicitud recibido:', req.body); // Log del cuerpo
    const validatedData = createClienteSchema.parse(req.body);
    console.log('Datos validados:', validatedData); // Log después de validación
    const nuevoCliente = await crearCliente(validatedData);
    res.status(201).json(nuevoCliente);
  } catch (error: any) {
    if (error instanceof ZodError) {
      console.log('Errores de validación de Zod:', error.errors); // Log de errores de Zod
      const errors = error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      res.status(400).json({ errors });
      return;
    }
    if (error.message === 'El número de teléfono ya está registrado') {
      res.status(409).json({
        errors: [{ field: 'telefono', message: 'El número de teléfono ya está registrado' }],
      });
      return;
    }
    console.error('Error al crear el cliente:', error);
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
};

export const actualizarClienteHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.status(400).json({ error: 'ID debe ser un número válido' });
    return;
  }

  try {
    const validatedData = updateClienteSchema.parse(req.body);
    const clienteActualizado = await actualizarCliente(Number(id), validatedData);
    res.status(200).json(clienteActualizado);
  } catch (error: any) {
    if (error instanceof ZodError) {
      const errors = error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      res.status(400).json({ errors });
      return;
    }
    if (error.message === 'El número de teléfono ya está registrado') {
      res.status(409).json({
        errors: [{ field: 'telefono', message: 'El número de teléfono ya está registrado' }],
      });
      return;
    }
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

export const obtenerClientesHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const clientes = await obtenerClientes();
    res.status(200).json(clientes);
  } catch (error: any) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

export const obtenerClientePorIdHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.status(400).json({ error: 'ID debe ser un número válido' });
    return;
  }

  try {
    const cliente = await obtenerClientePorId(Number(id));
    if (!cliente) {
      res.status(404).json({ error: 'Cliente no encontrado' });
      return;
    }
    res.status(200).json(cliente);
  } catch (error: any) {
    console.error('Error al obtener el cliente:', error);
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
};

export const eliminarClienteHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.status(400).json({ error: 'ID debe ser un número válido' });
    return;
  }

  try {
    await eliminarCliente(Number(id));
    res.status(204).send();
  } catch (error: any) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
};