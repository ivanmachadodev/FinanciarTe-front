import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { DolarIndice } from '../Models/dolar-indice';

@Injectable({
  providedIn: 'root'
})
export class DolarIndiceService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  });

  private baseUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  GetHistoricoDolarIndice() : Observable<DolarIndice[]> {
    return this.httpClient.get<DolarIndice[]>(`${this.baseUrl}Dolar/getHistoricoDolarIndice`, { headers: this.headers});
  }

  GetUltimoDolarIndice() : Observable<DolarIndice> {
    return this.httpClient.get<DolarIndice>(`${this.baseUrl}Dolar/getUltimoDolarIndice`, { headers: this.headers});
  }
  
}
