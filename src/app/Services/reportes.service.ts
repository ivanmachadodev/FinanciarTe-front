import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  });

  private baseUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  GetValoresDolarIndice() : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Reportes/getValoresDolarIndice`, { headers: this.headers});
  }

  GetMaxMInDolarIndice() : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Reportes/getMaxMInDolarIndice`, { headers: this.headers});
  }

  GetResumenPrestamos() : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Reportes/getResumenPrestamos`, { headers: this.headers});
  }

  GetRecaudacionMensual() : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Reportes/getRecaudacionMensual`, { headers: this.headers});
  }

  GetBalance() : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Reportes/getBalance`, { headers: this.headers});
  }

  GetCuotasMesEnCurso() : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Reportes/getCuotasMesEnCurso`, { headers: this.headers});
  }
  
}
