export type Cliente = {
    id: number;
    zona: string;
    nombre: string;
    barrio: string;
    direccion: string;
    localidad: string | null;         // Nuevo campo
    detalleDireccion: string | null;
    telefono: string; // Debe comenzar con "+" y contener entre 2 y 15 dígitos
    semana: string | null;
    observaciones: string | null;
    tipoCliente: string;
    debe: number | null;
    fechaDeuda: string | null;
    precio: number | null;
    ultimaRecoleccion: string | null;
    contratacion: string | null;
    estadoTurno: string | null;
    prioridad: string | null;
    estado: string | null;
    gestionComercial: string | null;
    CUIT: string | null;              // Nuevo campo
    condicion: string | null;         // Nuevo campo
    factura: string | null;           // Nuevo campo
    pago: string | null;              // Nuevo campo
    origenFacturacion: string | null; // Nuevo campo
    nombreEmpresa: string | null;     // Nuevo campo
    emailAdministracion: string | null; // Nuevo campo
    emailComercial: string | null;    // Nuevo campo
};