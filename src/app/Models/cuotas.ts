export interface Cuotas {
    idCuota: number;
    idCliente: number;
    idPrestamo: number;
    numeroCuota: number;
    fechaVencimiento: Date;
    montoCuota: number;
    fechaPago: Date;
    montoAbonado: number;
    cuotaVencida: boolean;
    idTransaccion: number;
    idDetalleTransaccion: number;
}

export interface DTOCuotas{
    idCuota: number;
    idCliente: number;
    idPrestamo: number;
    nroCuota: number;
    fechaVencimiento: Date;
    montoCuota: number;
    fechaPago: Date;
    montoAbonado: number;
    cuotaVencida: string;
    idTransaccion: number;
    idDetalleTransaccion: number;
    idPuntos: number;
}

export interface ViewCuotaCliente{
    dni: number;
    cliente: string;
    idPrestamo: number;
    idCuota: number;
    cuotaN: number;
    fechaDeVencimiento: Date;
    montoDeCuota: number;
    fechaDePago: Date;
    montoAbonado: number;
    cuotaVencida: string;
    diasVencidos: number,
    idTransacción: number;
    idDetalleTransacción: number;
    puntosOtorgados: number
}

export interface ComandoCuotas{
    fechaPago: Date,
    idTransaccion: number,
    idEntidadFinanciera: number,
    detalleCuotas: ComandoDetalleCuotas[]
}

export interface ComandoDetalleCuotas{
    idCuota: number,
    idPrestamo: number,
    numeroCuota: number,
    fechaPago: Date
    montoAbonado: number,
    cuotaVencida: boolean,
    idTransaccion: number,
    idDetalleTransaccion: number
}

export interface DTOCuotasMesEnCurso{
    descripcion: string;
    cantidad: number;
}