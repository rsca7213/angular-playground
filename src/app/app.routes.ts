import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/pages/home/home').then((m) => m.Home),
    title: 'Home',
    data: { needsAuth: true },
    canActivate: [authGuard]
  },
  {
    path: 'playground',
    loadComponent: () => import('./modules/playground/pages/playground').then((m) => m.Playground),
    title: 'Playground',
    data: { needsAuth: true },
    canActivate: [authGuard]
  },
  {
    path: 'products',
    data: { needsAuth: true },
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Products',
        loadComponent: () => import('./modules/products/pages/products').then((m) => m.Products)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./modules/products/pages/view-product').then((m) => m.ViewProduct),
        title: 'Product'
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./core/pages/login/login').then((m) => m.Login),
    title: 'Login',
    data: { needsAuth: false, ifAuthenticatedRedirect: '/' },
    canActivate: [authGuard]
  },
  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: '**',
    loadComponent: () => import('./core/pages/not-found/not-found').then((m) => m.NotFound),
    title: 'Not Found',
    data: { needsAuth: false }
  }
];
