import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {UsuarioService} from "../../services/usuario.service";
import {IUsuario} from "../../interfaces/IUsuario";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{
  ListaUsuario:IUsuario[]=[];
constructor(
  public globales:GlobalService,
  public srvusuarios:UsuarioService
) {
}
ngOnInit() {
  this.ObtenerUsuarios();
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
}
