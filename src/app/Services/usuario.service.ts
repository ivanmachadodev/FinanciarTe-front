import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, map } from 'rxjs';
import { ComandoPutUsuario, ComandoUsuario, Usuario } from '../Models/usuario';
import { ResultadoBase } from '../Models/resultado-base';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  });

  private baseUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  checkIfLegajoExists(value: number): Observable<boolean> {
    return this.httpClient.get<Usuario[]>(`${this.baseUrl}Usuarios/getUsuarios`).pipe(
      map(z => z.some((a) => a.legajo === value)),
    )
  }

  GetTipoUsuario():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}TipoUsuarios/getTipoUsuForComboBox`,{ headers: this.headers})
  }

  GetViewUsuarios():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}Usuarios/getViewUsuarios`,{ headers: this.headers})
  }

  GetUsuarioByID(legajo: number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}Usuarios/getUsuarioByID/${legajo}`,{ headers: this.headers})
  }

  GetUsuarioByUser(user: string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}Usuarios/getUsuarioByUser/${user}`,{ headers: this.headers})
  }

  PostUsuario(usuario: ComandoUsuario): Observable<ResultadoBase>{
    return this.httpClient.post<ResultadoBase>(`${this.baseUrl}Registro/PostRegister`, usuario, {headers: this.headers});
  }

  PutUsuario(usuario: ComandoPutUsuario): Observable<ResultadoBase>{
    return this.httpClient.put<ResultadoBase>(`${this.baseUrl}Registro/PutUsuario`, usuario, {headers: this.headers});
  }

  DeleteUsuario(id: number): Observable<any>{
    return this.httpClient.delete<ResultadoBase>(`${this.baseUrl}Usuarios/deleteSoftUsuario/${id}`, {headers: this.headers});
  }

}
