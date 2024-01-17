import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../Services/users.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private userService:UsersService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken= this.userService.getToken()
    const authRequest=request.clone({
      headers:request.headers.set("Authorization","Bearer "+authToken)
    })
    return next.handle(authRequest);
  }
}
