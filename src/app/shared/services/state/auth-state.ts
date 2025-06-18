// auth-state.ts (Revised)

import { effect, Injectable, signal } from '@angular/core';
import { IAuthUser } from '../../dtos/state/auth-user';
import { IApiErrorResponse } from '../../dtos/api/error-response';

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private authUser = signal<IAuthUser | null>(null);
  private isAuthenticated = signal<boolean>(false);

  public constructor() {
    effect(() => {
      console.log('AuthState: ', this.isAuthenticated());
    });
  }

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
    this.isAuthenticated.set(true);
    this.authUser.set(user as IAuthUser);
    return true;
  }

  // Returns the currently authenticated user, if any
  public getAuthUser(): IAuthUser | null {
    return this.authUser();
  }

  // Returns the current authentication status
  public isUserAuthenticated(): boolean {
    return this.isAuthenticated();
  }

  // Clears the user and authentication status
  public clearAuth(): void {
    this.authUser.set(null);
    this.isAuthenticated.set(false);
  }
}
