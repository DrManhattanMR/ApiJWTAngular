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
      responseType: 'json'
    });
  }
  AgregarUsuario(user:IUsuario){
    return this.http.post(environment.urlApi+this.controller,user,{
      headers: this.httpHeaders,
      responseType: 'json'
    });
  }
  EditarUsuario(user:IUsuario){
    return this.http.put(environment.urlApi+this.controller,user,{
      headers: this.httpHeaders,
      responseType: 'json'
    })
  }
  EliminarUsuario(id:number){
    return this.http.delete(environment.urlApi+this.controller+`/${id}`,{
      headers:this.httpHeaders,
      responseType:'json'
    })
  }
}
