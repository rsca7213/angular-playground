import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiHealthCheckResponse } from '../../dtos/api/health/api-health-check-response';

@Injectable({
  providedIn: 'root'
})
export class ApiHealth {
  private readonly http = inject(HttpClient);

  public constructor() {}

  public check(): Observable<ApiHealthCheckResponse> {
    return this.http.get<ApiHealthCheckResponse>(`${ENVIRONMENT.apiUrl}/actuator/health`);
  }
}
