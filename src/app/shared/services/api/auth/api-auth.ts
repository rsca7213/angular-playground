// api-auth.ts (Revised)

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiLoginUserBody } from '../../../dtos/api/auth/api-login-user-body';
import { firstValueFrom } from 'rxjs';
import { IApiLoginUserResponse } from '../../../dtos/api/auth/api-login-user-response';
import { ENVIRONMENT } from '../../../../../environments/environment';
import { AuthState } from '../../state/auth-state';
import { IAuthUser } from '../../../dtos/state/auth-user';
import { IApiErrorResponse } from '../../../dtos/api/error-response';
import { IApiCurrentUserResponse } from '../../../dtos/api/auth/api-current-user-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiAuth {
  private readonly http = inject(HttpClient);
  private readonly authState = inject(AuthState);
  private readonly router = inject(Router);

  public constructor() {}

  public async login(request: IApiLoginUserBody): Promise<IAuthUser | IApiErrorResponse> {
    // Attempt a login request
    const response = await firstValueFrom(
      this.http.post<IApiLoginUserResponse>(`${ENVIRONMENT.apiUrl}/auth/login`, request)
    ).catch((err: HttpErrorResponse) => err.error as IApiErrorResponse);

    // If the response is an error, clear state and return the error
    if ('error' in response) {
      this.authState.clearAuth();
      return response;
    }

    // On successful login, fetch the full user details
    return await this.getCurrentUser();
  }

  public async getCurrentUser(): Promise<IAuthUser | IApiErrorResponse> {
    // Fetch the current user details
    const response = await firstValueFrom(
      this.http.get<IApiCurrentUserResponse>(`${ENVIRONMENT.apiUrl}/auth/current-user`)
    ).catch((err: HttpErrorResponse) => err.error as IApiErrorResponse);

    // Determine if the user is authenticated based on the response
    const isUserAuthenticated = this.authState.setAuthUser(response);

    // If the user is not authenticated
    if (!isUserAuthenticated) {
      return response as IApiErrorResponse;
    }

    // Return the newly fetched user
    return response;
  }

  public async logout(): Promise<void> {
    // Attempt to log out the user
    await firstValueFrom(this.http.post(`${ENVIRONMENT.apiUrl}/auth/logout`, {})).catch(
      (err: HttpErrorResponse) => {
        return err.error as IApiErrorResponse;
      }
    );

    // Clear the authentication state
    this.authState.clearAuth();

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
