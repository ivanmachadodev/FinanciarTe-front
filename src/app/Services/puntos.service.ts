import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  });

  private baseUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  GetHistoricoPuntos() : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Puntos/getHistoricoPuntos`, { headers: this.headers});
  }

  GetHistoricoPuntosByCliente(id: number) : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Puntos/getHistoricoPuntosByCliente/${id}`, { headers: this.headers});
  }
  
}
