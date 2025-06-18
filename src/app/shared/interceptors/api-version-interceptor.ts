import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../environments/environment';

export const apiVersionInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const request = req.clone({
    setHeaders: {
      'X-Api-Version': ENVIRONMENT.apiVersion || '1.0.0'
    }
  });
  return next(request);
};
