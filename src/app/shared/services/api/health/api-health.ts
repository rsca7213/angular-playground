import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IApiHealthCheckResponse } from '../../../dtos/api/health/api-health-check-response';

@Injectable({
  providedIn: 'root'
})
export class ApiHealth {
  private readonly http = inject(HttpClient);

  public check(): Observable<IApiHealthCheckResponse> {
    return this.http.get<IApiHealthCheckResponse>(`${ENVIRONMENT.apiUrl}/actuator/health`);
  }
}
