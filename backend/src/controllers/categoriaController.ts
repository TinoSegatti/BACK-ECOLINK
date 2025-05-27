import { Request, Response, NextFunction } from 'express';
import { obtenerCategoriasPorCampo, crearCategoria, actualizarCategoria, eliminarCategoria } from '../services/categoriaService';

// Validador para colores hexadecimales
const isValidHexColor = (color: string): boolean => {
    return /^#[0-9A-Fa-f]{6}$/.test(color);
};

// Validador para formato de fecha dd/mm/aaaa
const isValidDateFormat = (date: string): boolean => {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
};

export const getCategoriasHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { campo } = req.query;
    if (!campo || typeof campo !== 'string') {
        res.status(400).json({ errors: [{ field: 'campo', message: 'El campo es requerido' }] });
        return;
    }
    try {
        const opciones = await obtenerCategoriasPorCampo(campo);
        res.json({ options: opciones });
    } catch (error) {
        next(error);
    }
};

export const crearCategoriaHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { campo, valor, color } = req.body;
    if (!campo || !valor) {
        res.status(400).json({ errors: [{ field: 'general', message: 'Campo y valor son requeridos' }] });
        return;
    }
    if (color && !isValidHexColor(color)) {
        res.status(400).json({ errors: [{ field: 'color', message: 'El color debe ser un valor hexadecimal válido (ej. #FF0000)' }] });
        return;
    }
    try {
        const nuevaCategoria = await crearCategoria(campo, valor, color);
        res.status(201).json(nuevaCategoria);
    } catch (error: any) {
        if (error.code === 'P2002') {
            res.status(409).json({ errors: [{ field: 'general', message: `Ya existe una categoría con campo "${campo}" y valor "${valor}"` }] });
            return;
        }
        next(error);
    }
};

export const actualizarCategoriaHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { campo, oldValor, newValor, color } = req.body;
    if (!campo || !oldValor || !newValor) {
        res.status(400).json({ errors: [{ field: 'general', message: 'Campo, valor antiguo y nuevo valor son requeridos' }] });
        return;
    }
    if (color && !isValidHexColor(color)) {
        res.status(400).json({ errors: [{ field: 'color', message: 'El color debe ser un valor hexadecimal válido (ej. #FF0000)' }] });
        return;
    }
    try {
        const categoriaActualizada = await actualizarCategoria(campo, oldValor, newValor, color);
        res.json(categoriaActualizada);
    } catch (error) {
        next(error);
    }
};

export const eliminarCategoriaHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { campo, valor, deleteAt } = req.body;
    if (!campo || !valor || !deleteAt) {
        res.status(400).json({
            errors: [{ field: 'general', message: 'Campo, valor y deleteAt son requeridos' }],
        });
        return;
    }
    if (!isValidDateFormat(deleteAt)) {
        res.status(400).json({
            errors: [{ field: 'deleteAt', message: 'La fecha debe estar en formato dd/mm/aaaa' }],
        });
        return;
    }
    try {
        await eliminarCategoria(campo, valor, deleteAt);
        res.status(204).send();
    } catch (error: any) {
        if (error.message.includes('está en uso')) {
            res.status(409).json({
                errors: [{ field: 'general', message: error.message }],
            });
            return;
        }
        if (error.message === 'Campo no gestionable') {
            res.status(400).json({
                errors: [{ field: 'campo', message: 'El campo especificado no es gestionable' }],
            });
            return;
        }
        res.status(500).json({
            errors: [{ field: 'general', message: 'Error al eliminar la categoría' }],
        });
    }
};