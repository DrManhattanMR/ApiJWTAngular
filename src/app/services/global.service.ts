import {Injectable} from '@angular/core';
import {IUsuario} from "../interfaces/IUsuario";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {AuthGuard, PermissionsService} from "./auth.guard";
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phonePattern:RegExp = /^(\+52|52)?\s*([2-9]{1}[0-9]{9})$/;
  NombreCompleto:string|null=this.getNombreSesion();
  progress:boolean=false;
  isUserLoggedIn: boolean=false;
  constructor(
    private messageService: MessageService,
    public router:Router,
    private auth:PermissionsService

  ) { }
  MostrarProgressBar(status: boolean) {
    setTimeout(() => {
      this.progress = status;
    }, 100);
  }
  ShowToast(color: string, titulo: string, mensaje: string) {
    this.messageService.add({severity: color, summary: titulo, detail: mensaje});
  }
  GotoPage(ruta:string,parametro:string|number){
    if (!parametro)
      this.router.navigate([ruta]);
    else
      this.router.navigate([ruta,parametro]);
  }
  setSession(usuario:IUsuario){
    localStorage.setItem('Id',usuario.id!.toString());
    localStorage.setItem('Nombre',usuario.nombre+' '+usuario.apellidos);
    localStorage.setItem('Token',usuario.token!);
    this.getNombreSesion();
  }
  closeSession(){
    this.ShowToast('info','🥱 bye bye!', 'Hasta Pronto');
    localStorage.removeItem('Id')
    localStorage.removeItem('Nombre')
    localStorage.removeItem('Token')
    this.GotoPage('/home','')
    this.isUserLoggedIn=false;
  }
  getAuthToken():string|null {
    if (this.auth.isLogged())
      return localStorage.getItem('Token')
    return null
  }
  getNombreSesion():string|null{
    if (this.auth.isLogged()){
      console.log('asasasassaas')
      this.NombreCompleto=localStorage.getItem('Nombre');
      return this.NombreCompleto;
    }
    return null
  }
}
