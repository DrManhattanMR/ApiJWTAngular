import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IRol} from "../interfaces/Rol";
import {Header} from "primeng/api";
@Injectable({
  providedIn: 'root'
})
export class RolService {

  controller:string='Rol'
  httpHeaders = new HttpHeaders().set('Accept', 'application/json');
  constructor(public http: HttpClient) { }
  ObtenerRoles(){
    return this.http.get<IRol[]>(environment.urlApi + this.controller, {
      headers: this.httpHeaders,
      responseType: 'json',
    });
  }
  AddRol(rol:IRol){
    return this.http.post(environment.urlApi+this.controller,rol,{
      headers:this.httpHeaders,
      responseType:'json'
    });
  }
  UpdateRol(rol:IRol){
    return this.http.put(environment.urlApi+this.controller,rol,{
      headers:this.httpHeaders,
      responseType:'json'
    });
  }
  EliminarRol(id:number){
    return this.http.delete(environment.urlApi+this.controller+`/${id}`,{
      headers:this.httpHeaders,
      responseType:'json'
    })
  }
}
