import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Prestamos } from '../Models/prestamos';
import { ResultadoBase } from '../Models/resultado-base';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  });

  private baseUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  PutPrestamo(prestamo: Prestamos) : Observable<any> {
    return this.httpClient.put(`${this.baseUrl}Prestamo/modificarPrestamo/`+ prestamo.idPrestamo, prestamo, { headers: this.headers});
  }

  PostPrestamo(prestamo: Prestamos) : Observable<ResultadoBase> {
    return this.httpClient.post<ResultadoBase>(`${this.baseUrl}Prestamo/registrarPrestamo`, prestamo, { headers: this.headers});
  }

  GetPrestamoByID(id: number) : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Prestamo/getPrestamoCuotasById/`+id, { headers: this.headers});
  }

  getPrestamosByIdToMod(id: number) : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Prestamo/getPrestamosByIdToMod/`+id, { headers: this.headers});
  }

  GetPrestamosByCliente(id: number) : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Prestamo/getPrestamosByCliente/`+id, { headers: this.headers});
  }

  GetPrestamos() : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Prestamo/getPrestamos/`, { headers: this.headers});
  }

  GetEntidadFinanciera() : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}EntidadesFinancieras/getEntFinForComboBox`, { headers: this.headers});
  }
}
