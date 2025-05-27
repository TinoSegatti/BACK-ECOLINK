import { PrismaClient, Categoria } from '@prisma/client';

const prisma = new PrismaClient();

export const obtenerCategoriasPorCampo = async (campo: string): Promise<{ valor: string; color: string | null }[]> => {
    try {
        const categorias = await prisma.categoria.findMany({
            where: {
                campo,
                deleteAt: null, // Solo categorías no borradas
            },
            select: { valor: true, color: true },
        });
        return categorias;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw new Error('No se pudo obtener las categorías');
    }
};

export const crearCategoria = async (campo: string, valor: string, color?: string): Promise<Categoria> => {
    try {
        return await prisma.categoria.create({
            data: { campo, valor, color, deleteAt: null },
        });
    } catch (error) {
        console.error('Error al crear categoría:', error);
        throw error;
    }
};

export const actualizarCategoria = async (campo: string, oldValor: string, newValor: string, color?: string): Promise<Categoria> => {
    try {
        return await prisma.categoria.update({
            where: {
                campo_valor: { campo, valor: oldValor },
                deleteAt: null, // Solo actualizar si no está borrada
            },
            data: { valor: newValor, color },
        });
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        throw new Error('No se pudo actualizar la categoría');
    }
};

export const eliminarCategoria = async (campo: string, valor: string, deleteAt: string): Promise<void> => {
    try {
        // Lista de campos gestionables en la tabla cliente
        const camposGestionables: { campo: string; clienteField: string }[] = [
            { campo: 'zona', clienteField: 'zona' },
            { campo: 'semana', clienteField: 'semana' },
            { campo: 'tipoCliente', clienteField: 'tipoCliente' },
            { campo: 'estadoTurno', clienteField: 'estadoTurno' },
            { campo: 'prioridad', clienteField: 'prioridad' },
            { campo: 'estado', clienteField: 'estado' },
            { campo: 'gestionComercial', clienteField: 'gestionComercial' },
        ];

        // Verificar si el campo es gestionable
        const campoConfig = camposGestionables.find((c) => c.campo === campo);
        if (!campoConfig) {
            throw new Error('Campo no gestionable');
        }

        // Consultar si la categoría está en uso en la tabla cliente
        const clienteEnUso = await prisma.cliente.findFirst({
            where: {
                [campoConfig.clienteField]: valor,
            },
        });

        if (clienteEnUso) {
            throw new Error(`La categoría "${valor}" está en uso por un cliente y no puede ser eliminada`);
        }

        // Marcar la categoría como eliminada con la fecha proporcionada
        await prisma.categoria.update({
            where: { campo_valor: { campo, valor } },
            data: { deleteAt },
        });
    } catch (error) {
        console.error('Error al marcar categoría como eliminada:', error);
        throw error;
    }
};