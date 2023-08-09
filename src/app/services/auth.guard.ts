import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //your logic goes here
    if (this.isLogged()) {
      // User is logged in, allow access to the route
      return true;
    } else {
      // User is not logged in, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
  isLogged(): boolean {
    // Read user data from localStorage
    let userData = localStorage.getItem('Nombre');
    // Check if the user is logged in
    return !!userData;
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}
