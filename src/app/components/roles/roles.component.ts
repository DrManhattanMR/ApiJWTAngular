import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {RolService} from "../../services/rol.service";
import {IRol} from "../../interfaces/Rol";
import {ConfirmationService, ConfirmEventType} from "primeng/api";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit{
  ListaRol:IRol[]=[];
  IsOpen:boolean=false;
  Rol:IRol={} as IRol;
  Accion:string='';
constructor(
  public globales:GlobalService,
  public srvroles:RolService,
  private confirmationService: ConfirmationService
) {
}
ngOnInit() {
  this.ObtenerRoles();
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
  OpenDialog(accion:string, rol:IRol){
  this.Accion=accion;
  if (this.Accion=='Agregar')
    this.Rol={} as IRol;
this.Rol= {...rol};
this.IsOpen=!this.IsOpen;
}
AgregarRol(){
  console.log(this.Rol);
  this.srvroles.AddRol(this.Rol).subscribe({
    next: (data: any) => {
      this.globales.MostrarProgressBar(false);
      this.IsOpen=false;
      if (data.messagge== 'Created'){
        this.globales.ShowToast('success','Bien','Rol agregado');
        this.ObtenerRoles();
      }
    },
    error: (err) => {
      this.globales.MostrarProgressBar(false);
      this.globales.ShowToast('error','😕Intente Nuevamente', err.error.resultado);
      this.IsOpen=false;
      console.log(err);
    },
    complete: () => {
      this.globales.MostrarProgressBar(false);
      this.IsOpen=false;
    }
  })
}
EditarRol(){
  this.srvroles.UpdateRol(this.Rol).subscribe({
    next: (data: any) => {
      this.IsOpen=false;
      this.globales.MostrarProgressBar(true);
      if (data.messagge=='Updated'){
        this.globales.ShowToast('success','Bien','Rol editado');
        this.ObtenerRoles();
      }
      console.log(data);
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
Eliminar(id:number){
this.srvroles.EliminarRol(id).subscribe({
  next: (data: any) => {
    this.globales.MostrarProgressBar(true);
    if (data.messagge=='Deleted'){
      this.globales.ShowToast('success','Bien','Rol eliminado');
      this.ObtenerRoles();
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
  DialogOptions(rol:IRol) {
    this.confirmationService.confirm({
      message: 'Deseas Eliminar el Rol? '+`${rol.descripcion}`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Eliminar(rol.id)
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
