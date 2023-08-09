import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IRol} from "../interfaces/Rol";
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
}
