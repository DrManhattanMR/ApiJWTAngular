import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {UsuarioService} from "../../services/usuario.service";
import {IUsuario} from "../../interfaces/IUsuario";
import {IRol} from "../../interfaces/Rol";
import {RolService} from "../../services/rol.service";
import {ConfirmationService, ConfirmEventType} from "primeng/api";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{
  ListaUsuario:IUsuario[]=[];
  ListaRol:IRol[]=[];
  IsOpen:boolean=false;
  Accion:string='';
  Usuario:IUsuario={} as IUsuario;
  RolSelect:IRol|undefined={} as IRol;
constructor(
  public globales:GlobalService,
  public srvusuarios:UsuarioService,
  public srvroles:RolService,
  private confirmationService:ConfirmationService
) {
}
ngOnInit() {
  this.ObtenerUsuarios();
  this.ObtenerRoles()
}
OpenModal(accion:string,user:IUsuario){
  this.Accion=accion;
  this.Accion == 'Agregar' ? this.Usuario = {} as IUsuario : this.Usuario = {...user};
  this.RolSelect=this.GetRolDescription(this.Usuario.role);
  this.IsOpen=true;
}
ObtenerUsuarios(){
  this.globales.MostrarProgressBar(true);
  this.srvusuarios.ObtenerUsuarios().subscribe({
    next: (data: IUsuario[]) => {
      this.globales.MostrarProgressBar(false);
      this.ListaUsuario=data;
      console.log(this.ListaUsuario)
    },
    error: (err) => {
      this.ListaUsuario=[];
      this.globales.MostrarProgressBar(false);
      console.log(err);
      this.globales.ShowToast('error','😕Actualize nuevamente', err.error.resultado);
    },
    complete: () => {
      this.globales.MostrarProgressBar(false);
    }
  })
}
GetRolDescription(role:number):IRol|undefined{
return this.ListaRol.find(x=>x.id===role);
}
OnChangeRol(event:any){
  this.RolSelect=event.value;
}
AgregarUser(){
  this.globales.MostrarProgressBar(true);
  this.Usuario.role=<number>this.RolSelect?.id;
  this.Usuario.password='******';
  console.log(this.Usuario)
  this.srvusuarios.AgregarUsuario(this.Usuario).subscribe({
    next: (data: any) => {
      this.IsOpen=false;
      this.globales.MostrarProgressBar(false);
      console.log(data);
      if (data.messagge== 'Created'){
        this.globales.ShowToast('success','Bien','Usuario agregado');
        this.ObtenerUsuarios();
      }
    },
    error: (err) => {
      this.IsOpen=false;
      this.globales.MostrarProgressBar(false);
      this.globales.ShowToast('error','😕Intente Nuevamente', err.error.resultado);
      console.log(err);
    },
    complete: () => {
      this.IsOpen=false;
      this.globales.MostrarProgressBar(false);
    }
  })
}
EditarUser(){
  this.globales.MostrarProgressBar(true);
  this.Usuario.role=<number>this.RolSelect?.id;
  this.srvusuarios.EditarUsuario(this.Usuario).subscribe({
    next: (data: any) => {
      this.globales.MostrarProgressBar(false);
      this.IsOpen=false;
      if (data.messagge=='Updated'){
        this.globales.ShowToast('success','Bien','Usuario editado');
        this.ObtenerUsuarios();
      }
      console.log(data);
    },
    error: (err) => {
      this.globales.MostrarProgressBar(false);
      this.globales.ShowToast('error','😕Intente Nuevamente', err.error.resultado);
      this.IsOpen=false;
      console.log(err);
    },
    complete: () => {
      this.globales.MostrarProgressBar(false);
    }
  })
}
  ObtenerRoles(){
    this.globales.MostrarProgressBar(true);
    this.srvroles.ObtenerRoles().subscribe({
      next: (data: IRol[]) => {
        this.globales.MostrarProgressBar(false);
        this.ListaRol=data;
        console.log(this.ListaRol);
      },
      error: (err) => {
        this.globales.MostrarProgressBar(false);
        this.globales.ShowToast('error','😕Actualize nuevamente', err.error.resultado);
        this.ListaRol=[];
        console.log(err);
      },
      complete: () => {
        this.globales.MostrarProgressBar(false);
      }
    })
  }
  Eliminar(id:number){
    this.srvusuarios.EliminarUsuario(id).subscribe({
      next: (data: any) => {
        this.globales.MostrarProgressBar(true);
        if (data.messagge=='Deleted'){
          this.globales.ShowToast('success','Bien','Usuario eliminado');
          this.ObtenerUsuarios();
        }
        console.log(data);
      },
      error: (err) => {
        this.globales.MostrarProgressBar(false);
        console.log(err);
      },
      complete: () => {
        this.globales.MostrarProgressBar(false);
      }
    })
  }
  DialogOptions(usuario:IUsuario) {
    this.confirmationService.confirm({
      message: 'Deseas Eliminar el Usuario? '+`${usuario.nombre}`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Eliminar(usuario.id);
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.globales.ShowToast('info','Bien','No se eliminó ningún registro');
            break;
          case ConfirmEventType.CANCEL:
            this.globales.ShowToast('info','Bien','No se eliminó ningún registro');
            break;
        }
      }
    });
  }
}
