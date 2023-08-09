import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {GlobalService} from "./global.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor  {

  constructor(public globales:GlobalService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.globales.getAuthToken();
    //the next if is use to ignore bearer token, just to login
    if (!token&&request.url.includes('/api/Login')){
      return next.handle(request);
    }

    if (token && !request.url.includes('/api/Login')) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.globales.ShowToast('error','😕Error!', 'Tu sesión expiró, ingresa nuevamente');
            this.globales.GotoPage('/home','');
            this.globales.closeSession();
          }
        }
        return throwError(err);
      })
    )
  }
}
