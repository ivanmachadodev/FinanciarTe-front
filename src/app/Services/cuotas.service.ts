import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ComandoCuotas, Cuotas } from '../Models/cuotas';
import { Observable } from 'rxjs';
import { ResultadoBase } from '../Models/resultado-base';

@Injectable({
  providedIn: 'root'
})
export class CuotasService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  });

  private baseUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  PutPrestamo(cuota: Cuotas) : Observable<any> {
    return this.httpClient.put(`${this.baseUrl}Prestamo/modificarPrestamo/`, cuota, { headers: this.headers});
  }
  
  GetCuotaByID(id: number) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}Cuotas/getCuota/${id}`, {headers: this.headers})
  }

  GetCuotasCliente(id: number) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}Cuotas/getCuotasPendientesByCliente/${id}`, {headers: this.headers})
  }

  GetViewCuotasCliente(id: number) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}Cuotas/getViewCuotasCliente/${id}`, {headers: this.headers})
  }

  PutCuota(cuota: Cuotas) : Observable<any> {
    return this.httpClient.put(`${this.baseUrl}Cuotas/modificarCuota/`+ cuota, { headers: this.headers});
  }

  PostCuota(cuota: ComandoCuotas) : Observable<ResultadoBase> {
    return this.httpClient.post<ResultadoBase>(`${this.baseUrl}Cuotas/registrarCuotas/`, cuota, { headers: this.headers});
  }
}
