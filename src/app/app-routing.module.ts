import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./services/auth.guard";
import {UsuariosComponent} from "./components/usuarios/usuarios.component";
import {RolesComponent} from "./components/roles/roles.component";

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate:[AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "usuarios", component: UsuariosComponent, canActivate:[AuthGuard] },
  { path: "roles", component: RolesComponent, canActivate:[AuthGuard] },
  { path: "**", pathMatch: "full", redirectTo: "/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
