import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IApiErrorResponse } from '../dtos/api/error-response';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error) {
        return throwError(() => error.error as IApiErrorResponse);
      }

      const generic: IApiErrorResponse = {
        status: error.status,
        statusText: error.statusText,
        message: 'An unexpected error occurred, please try again later.',
        timestamp: new Date().toISOString(),
        errorCode: 'UNKNOWN_ERROR',
        errors: [error.message]
      };

      return throwError(() => generic);
    })
  );
};
