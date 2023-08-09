import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {RolService} from "../../services/rol.service";
import {IRol} from "../../interfaces/Rol";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit{
  ListaRol:IRol[]=[];
constructor(
  public globales:GlobalService,
  public srvroles:RolService
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
}
