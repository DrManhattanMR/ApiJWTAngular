import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {IUsuario, CreateUsuario} from "../../interfaces/IUsuario";
import {LoginService} from "../../services/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  Usuario:IUsuario=CreateUsuario();
constructor(
  public globales:GlobalService,
  public srvlogin:LoginService
) {

}
ngOnInit() {
  console.log(this.Usuario)
  }
  Login(){
    this.globales.MostrarProgressBar(true);
    this.srvlogin.IniciarSesion(this.Usuario).subscribe({
      next: (data: IUsuario) => {
        this.Usuario=data;
        this.globales.MostrarProgressBar(false);
        console.log(this.Usuario);
        if (this.Usuario.nombre&&this.Usuario.password){
          this.globales.setSession(this.Usuario);
          this.globales.isUserLoggedIn=true;
          this.globales.ShowToast('success','😊 Bienvenido',this.Usuario.nombre+' '+this.Usuario.apellidos);
        }
      },
      error: (err) => {
        this.globales.MostrarProgressBar(false);
        if (err.error.status==401){
          this.globales.ShowToast('error','😕Error!', 'Verifica tus Credenciales');
        }
        console.log(err);
      },
      complete: () => {
        this.globales.MostrarProgressBar(false);
      }
    })
  }
}
