export interface ResumenPrestamos {
    nombre: string;
    cliente: number;
    cantidadDePrestamos: number;
    prestamosCancelados: number;
    prestamosPendientes: number;
    prestamosRefinanciados: number;
    cuotasVencidas: number;
    totalDeCuotas: number;
    porcentajeCumplCuotas: number;
}
