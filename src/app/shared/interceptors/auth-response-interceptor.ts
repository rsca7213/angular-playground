import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

const excludeApiPaths = ['auth/login', 'auth/logout', 'auth/current-user'];

export const authResponseInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isExcludedPath = excludeApiPaths.some((path) => req.url.includes(path));

      if (error.status === HttpStatusCode.Unauthorized && !isExcludedPath) {
        router.navigateByUrl('/login', { replaceUrl: true });
      }

      if (error.status === HttpStatusCode.Forbidden && !isExcludedPath) {
        router.navigateByUrl('/', { replaceUrl: true });
      }

      return throwError(() => error);
    })
  );
};
