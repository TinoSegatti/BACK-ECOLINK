import { PrismaClient, Cliente } from '@prisma/client';

const prisma = new PrismaClient();

export const crearCliente = async (data: Omit<Cliente, 'id'>): Promise<Cliente> => {
  try {
    // Verificar si el teléfono ya existe
    const clienteExistente = await prisma.cliente.findFirst({
      where: { telefono: data.telefono },
    });
    if (clienteExistente) {
      throw new Error('El número de teléfono ya está registrado');
    }

    return await prisma.cliente.create({
      data: {
        zona: data.zona,
        nombre: data.nombre,
        barrio: data.barrio,
        direccion: data.direccion,
        localidad: data.localidad ?? null,
        telefono: data.telefono,
        tipoCliente: data.tipoCliente,
        detalleDireccion: data.detalleDireccion,
        semana: data.semana,
        observaciones: data.observaciones,
        debe: data.debe,
        fechaDeuda: data.fechaDeuda,
        precio: data.precio,
        ultimaRecoleccion: data.ultimaRecoleccion,
        contratacion: data.contratacion,
        nuevo: true, // Siempre true por defecto
        estadoTurno: data.estadoTurno,
        prioridad: data.prioridad,
        estado: data.estado,
        gestionComercial: data.gestionComercial,
        CUIT: data.CUIT,
        condicion: data.condicion,
        factura: data.factura,
        pago: data.pago,
        origenFacturacion: data.origenFacturacion,
        nombreEmpresa: data.nombreEmpresa,
        emailAdministracion: data.emailAdministracion,
        emailComercial: data.emailComercial,
      },
    });
  } catch (error: any) {
    console.error('Error al crear cliente:', error);
    throw new Error(error.message || 'No se pudo crear el cliente');
  }
};

export const actualizarCliente = async (id: number, data: Partial<Omit<Cliente, 'id'>>): Promise<Cliente> => {
  try {
    // Si se está actualizando el teléfono, verificar si ya existe
    if (data.telefono) {
      const clienteExistente = await prisma.cliente.findFirst({
        where: {
          telefono: data.telefono,
          id: { not: id }, // Excluir el cliente actual
        },
      });

      if (clienteExistente) {
        throw new Error('El número de teléfono ya está registrado');
      }
    }

    return await prisma.cliente.update({
      where: { id },
      data: {
        zona: data.zona,
        nombre: data.nombre,
        barrio: data.barrio,
        direccion: data.direccion,
        localidad: data.localidad ?? null,
        telefono: data.telefono,
        tipoCliente: data.tipoCliente,
        detalleDireccion: data.detalleDireccion,
        semana: data.semana,
        observaciones: data.observaciones,
        debe: data.debe,
        fechaDeuda: data.fechaDeuda,
        precio: data.precio,
        ultimaRecoleccion: data.ultimaRecoleccion,
        contratacion: data.contratacion,
        nuevo: data.nuevo,
        estadoTurno: data.estadoTurno,
        prioridad: data.prioridad,
        estado: data.estado,
        gestionComercial: data.gestionComercial,
        CUIT: data.CUIT,
        condicion: data.condicion,
        factura: data.factura,
        pago: data.pago,
        origenFacturacion: data.origenFacturacion,
        nombreEmpresa: data.nombreEmpresa,
        emailAdministracion: data.emailAdministracion,
        emailComercial: data.emailComercial,
      },
    });
  } catch (error: any) {
    console.error('Error al actualizar cliente:', error);
    throw new Error(error.message || 'No se pudo actualizar el cliente');
  }
};

export const obtenerClientes = async (): Promise<Cliente[]> => {
  try {
    return await prisma.cliente.findMany();
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    throw new Error('No se pudo obtener la lista de clientes');
  }
};

export const obtenerClientePorId = async (id: number): Promise<Cliente | null> => {
  try {
    return await prisma.cliente.findUnique({ where: { id } });
  } catch (error) {
    console.error('Error al obtener cliente por ID:', error);
    throw new Error('No se pudo encontrar el cliente');
  }
};

export const eliminarCliente = async (id: number): Promise<void> => {
  try {
    await prisma.cliente.delete({ where: { id } });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    throw new Error('No se pudo eliminar el cliente');
  }
};