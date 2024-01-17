import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponentComponent } from '../error-component/error-component.component';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private dialog:MatDialog) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponentComponent, {data: {message: errorMessage}});
        // this.errorService.throwError(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
