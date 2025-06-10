import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../services/state/auth-state';
import { ApiAuth } from '../services/api/auth/api-auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const authState = inject(AuthState);
  const apiAuth = inject(ApiAuth);
  const router = inject(Router);

  // Get the current route data
  const routeData = route.data;
  const needsAuth: boolean = routeData['needsAuth'] ?? true;
  const ifAuthenticatedRedirect: string = routeData['ifAuthenticatedRedirect'] ?? null;

  // Verify if the user is authenticated
  let isAuthenticated = authState.isUserAuthenticated();

  // If the user is not authenticated, attempt to fetch the current user
  if (!isAuthenticated) {
    const currentUserResponse = await apiAuth.getCurrentUser();
    isAuthenticated = authState.setAuthUser(currentUserResponse);
  }

  // If the user is authenticated and the route requires authentication, all good
  if (isAuthenticated && needsAuth === true) return true;

  // If the user is not authenticated and the route requires authentication, redirect to login
  if (!isAuthenticated && needsAuth === true) {
    router.navigate(['/login'], { queryParams: { redirectUrl: state.url } });
    return false;
  }

  // If the user is authenticated and the route does not require authentication, redirect if specified
  if (isAuthenticated && needsAuth === false && ifAuthenticatedRedirect) {
    router.navigate([ifAuthenticatedRedirect]);
    return false;
  }

  // If the route does not require authentication, allow access
  return true;
};
