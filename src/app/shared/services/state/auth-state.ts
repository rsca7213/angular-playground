import { Injectable } from '@angular/core';
import { IAuthUser } from '../../dtos/state/auth-user';
import { IApiCurrentUserResponse } from '../../dtos/api/auth/api-current-user-response';

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private authUser: IAuthUser | null = null;
  private isAuthenticated = false;
  private authToken: string | null = null;

  public constructor() {}

  public setAuthUser(user: IApiCurrentUserResponse): void {
    this.authUser = user;
    this.isAuthenticated = true;
  }

  public getAuthUser(): IAuthUser | null {
    return this.authUser;
  }

  public isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public setAuthToken(token: string): void {
    this.authToken = token;
  }
}
