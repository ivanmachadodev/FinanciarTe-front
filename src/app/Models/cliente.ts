import { ContactosAlternativos } from "./contactos-alternativos";

export interface Cliente {
  nroDni: number;
  nombres: string;
  apellidos: string;
  FechaNacimiento: Date;
  telefono: number;
  email: string;
  direccion: string;
  numero: number;
  codigoPostal: number;
  idCiudad: number;
  puntosIniciales: number;
  activo: boolean;
  idContactoAlternativo: number;
  contactoAlternativo?: ContactosAlternativos
}

export interface ComandoCliente {
  nroDni: number;
  nombres: string;
  apellidos: string;
  fechaDeNacimiento: Date;
  telefono: number;
  email: string;
  direccion: string;
  numero: number;
  codigoPostal: number;
  idCiudad: number;
  idProvincia?: number;
  puntosIniciales: number;
  activo: boolean;
  idContactoAlternativo: number;
  nombresAlt: string;
  apellidosAlt: string;
  telAlt: number;
  emailAlt: string;
}

export interface DTOCliente {
  dni: number;
  nombres: string;
  apellidos: string;
  fechaDeNacimiento: Date;
  telefono: number;
  email: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  codigoPostal: number;
  activo: string;
  puntosIniciales: number;
  cantidadDePrestamos: number;
  puntosActuales: number;
  scoring: number;
  beneficioScoring: number;
  contactoAlternativo: string;
  emailContAlt: string;
  telContAlt:  number;
}

export interface ClienteComboBox {
  id: number;
  descripcion: string;
}
