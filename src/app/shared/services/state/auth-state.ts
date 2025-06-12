// auth-state.ts (Revised)

import { Injectable } from '@angular/core';
import { IAuthUser } from '../../dtos/state/auth-user';
import { IApiErrorResponse } from '../../dtos/api/error-response';

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private authUser: IAuthUser | null = null;
  private isAuthenticated = false;

  // Sets the current user and authentication status
  public setAuthUser(user?: IAuthUser | IApiErrorResponse): boolean {
    // If no user is provided, clear the authentication state
    if (!user) {
      this.clearAuth();
      return false;
    }

    // If the fetch fails, clear state and return the error
    if ('errorCode' in user) {
      this.clearAuth();
      return false;
    }

    // On success, set the authenticated user in the state
    this.isAuthenticated = true;
    this.authUser = user as IAuthUser;
    return true;
  }

  // Returns the currently authenticated user, if any
  public getAuthUser(): IAuthUser | null {
    return this.authUser;
  }

  // Returns the current authentication status
  public isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  // Clears the user and authentication status
  public clearAuth(): void {
    this.authUser = null;
    this.isAuthenticated = false;
  }
}
