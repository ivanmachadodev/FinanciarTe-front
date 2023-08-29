import { DTOCuotas } from "./cuotas";

export interface Prestamos {
    idPrestamo?: number;
    idTransaccion?: number
    idCliente: number;
    montoOtorgado: number;
    cuotas: number;
    diaVencimientoCuota: number;
    idScoring: number;
    indiceInteres: number;
    montoADevolver: number;
    valorCuota: number;
    refinanciaDeuda: boolean;
    idPrestamoRefinanciado?: number;
    idEntidadFinanciera: number;
    fecha: Date
}

export interface DTOPrestamo{
    idPrestamo: number;
    idCliente: number;
    montoOtorgado: number;
    estado: string;
    saldoPendiente: number;
    cuotas: DTOCuotas[];
}

export interface DTOListadoPrestamos{
  idPrestamo: number,
  cliente: string,
  dniCliente: number
  indiceFinanciarTe: number,
  scoring: number,
  beneficioScoring: number,
  montoOtorgado: number,
  montoADevolver: number,
  cuotas: number,
  vencimientoPrimeraCuota: Date,
  vencimientoUltimaCuota: Date,
  cuotasPagas: number,
  montoAbonado: number,
  saldoPendiente: number,
  estado: string
}

