import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IUsuario} from "../interfaces/IUsuario";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
controller:string='Login'
  httpHeaders = new HttpHeaders().set('Accept', 'application/json');
  constructor(public http: HttpClient) { }
  IniciarSesion(usuario:IUsuario){
    return this.http.post<IUsuario>(environment.urlApi+this.controller,usuario,{
      headers:this.httpHeaders,
      responseType:'json'
    })
  }
}
