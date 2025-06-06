import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/pages/home/home').then((m) => m.Home),
    title: 'Home',
    data: { needsAuth: true }
  },
  {
    path: 'playground',
    loadComponent: () => import('./modules/playground/pages/playground').then((m) => m.Playground),
    title: 'Playground',
    data: { needsAuth: true }
  },
  {
    path: 'products',
    loadComponent: () => import('./modules/products/pages/products').then((m) => m.Products),
    title: 'Products',
    data: { needsAuth: true }
  },
  {
    path: 'login',
    loadComponent: () => import('./core/pages/login/login').then((m) => m.Login),
    title: 'Login',
    data: { needsAuth: false }
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
