import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cliente, ComandoCliente, DTOCliente } from '../Models/cliente';
import { ResultadoBase } from '../Models/resultado-base';
import { ComboBoxItem } from '../Models/combo-box-item';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  });

  private baseUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  getClientesForComboBox(): Observable<ComboBoxItem[]>{
    return this.httpClient.get<ComboBoxItem[]>(`${this.baseUrl}/Cliente/getClientesForComboBox`, { headers: this.headers});
  }

  GetClientes() : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Cliente/getClientes`, { headers: this.headers});
  }

  PostCliente(dto: ComandoCliente) : Observable<ResultadoBase> {
    return this.httpClient.post<ResultadoBase>(`${this.baseUrl}Cliente/postCliente`, dto, { headers: this.headers});
  }

  GetCiudades(id: number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}Ciudades/getCiudadesForComboBox/`+id,{ headers: this.headers})
  }

  GetProvincias():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}Provincia/getProvinciasForComboBox`,{ headers: this.headers})
  }

  GetClienteByID(id: number) : Observable<ComandoCliente> {
    return this.httpClient.get<ComandoCliente>(`${this.baseUrl}Cliente/getClienteByID/`+id, { headers: this.headers });
  }

  GetViewClienteByID(id: number) : Observable<DTOCliente> {
    return this.httpClient.get<DTOCliente>(`${this.baseUrl}Cliente/getViewClienteByID/`+id, { headers: this.headers });
  }

  PutCliente(cliente: ComandoCliente): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}Cliente/putCliente/`+cliente.nroDni, cliente, { headers: this.headers });
  }

  DeleteCliente(id: number): Observable<any>{
    return this.httpClient.delete(`${this.baseUrl}Cliente/deleteSoftCliente/`+ id, {headers: this.headers});
  }

  checkIfDniExists(value: number): Observable<boolean> {
    return this.httpClient.get<DTOCliente[]>(`${this.baseUrl}Cliente/getClientes`).pipe(
      map(z => z.some((a) => a.dni === value)),
    )
  }

  GetClientesForComboBox():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}Cliente/getClientesForComboBox`,{ headers: this.headers})
  }

}
