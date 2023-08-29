export interface Transacciones {
  idTransaccion: number;
  fechaTransaccion: Date;
  idEntidadFinanciera: number;
  entidadFinanciera: number;
  detalleTransacciones: DTO_Detalle_Trasaccion
}

export interface DTOTransacciones {
  idTransaccion: number;
  fechaTransaccion: Date;
  idEntidadFinanciera: number;
  entidadFinanciera: string;
  montoTotal: number;
  detalleTransacciones: DTO_Detalle_Trasaccion[]
}

export interface DTOTransacciones_DetT{
  idTransaccion: number;
  fechaTransaccion: Date;
  idEntidadFinanciera: number;
  entidadFinanciera: string;
  detalleTransacciones: DTO_Detalle_Trasaccion[]
}

export interface DTO_Detalle_Trasaccion{
  idDetalleTransaccion: number;
  idCategoria: number;
  categoria: string;
  detalle: string;
  tipoTransaccion: string;
  monto: number;
  idTransaccion: number;
}

export interface ComandoTransaccion{
  idTransaccion: number;
  idEntidadFinanciera: number;
  fechaTransaccion: Date;
  detallesTransacciones: ComandoDetalleTransaccione[]
}

export interface ComandoDetalleTransaccione{
  idDetalleTransaccion: number;
  idCategoria: number;
  detalle: string;
  monto: number;
  idTransaccion: number;
}
