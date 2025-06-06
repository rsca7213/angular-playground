import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiLoginUserBody } from '../../../dtos/api/auth/api-login-user-body';
import { firstValueFrom, Observable } from 'rxjs';
import { IApiLoginUserResponse } from '../../../dtos/api/auth/api-login-user-response';
import { ENVIRONMENT } from '../../../../../environments/environment';
import { AuthState } from '../../state/auth-state';
import { IAuthUser } from '../../../dtos/state/auth-user';
import { IApiErrorResponse } from '../../../dtos/api/error-response';
import { IApiCurrentUserResponse } from '../../../dtos/api/auth/api-current-user-response';

@Injectable({
  providedIn: 'root'
})
export class ApiAuth {
  private readonly http = inject(HttpClient);
  private readonly authState = inject(AuthState);

  public constructor() {}

  public async login(request: IApiLoginUserBody): Promise<IAuthUser | IApiErrorResponse> {
    // Attempt a login request
    const response = await firstValueFrom(
      this.http.post<IApiLoginUserResponse>(`${ENVIRONMENT.apiUrl}/auth/login`, request)
    ).catch((err: IApiErrorResponse) => err);

    // If the response is an error, return it
    if ('errorCode' in response) {
      return response;
    }

    // If the response is a successful login and a token is present
    // Set the auth user and token in the state
    this.authState.setAuthToken(response.token);

    // Fetch the current user details
    const currentUserResponse = await firstValueFrom(
      this.http.get<IApiCurrentUserResponse>(`${ENVIRONMENT.apiUrl}/auth/current-user`)
    ).catch((err: IApiErrorResponse) => err);

    // If the current user response is an error, return it
    if ('errorCode' in currentUserResponse) {
      return currentUserResponse;
    }

    // Set the authenticated user in the state
    this.authState.setAuthUser(currentUserResponse);

    // Return the authenticated user
    return this.authState.getAuthUser() as IAuthUser;
  }
}
