import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IUsuario} from "../interfaces/IUsuario";
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  controller:string='Usuario'
  httpHeaders = new HttpHeaders().set('Accept', 'application/json');
  constructor(public http: HttpClient) { }
  ObtenerUsuarios(){
    return this.http.get<IUsuario[]>(environment.urlApi + this.controller, {
      headers: this.httpHeaders,
      responseType: 'json',
    });
  }
}
