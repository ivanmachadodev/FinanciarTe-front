export interface Login {
    user: string;
    pass: string;
    tipoUsuario: string;
    token: string;
    activo: boolean; 
    nombre: string;
    apellido: string;
    message: string;
    ok: boolean;
    error: string
    codigoEstado: number;
}
