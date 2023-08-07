import { Component } from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {PermissionsService} from "../../services/auth.guard";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
constructor(
  public globales:GlobalService,
  private auth:PermissionsService
) {
}
ngOnInit(){
  this.globales.isUserLoggedIn=this.auth.isLogged();
}
}
