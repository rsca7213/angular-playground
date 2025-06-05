import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
    title: 'Home',
    data: { needsAuth: true }
  },
  {
    path: 'playground',
    loadComponent: () => import('./playground/playground').then((m) => m.Playground),
    title: 'Playground',
    data: { needsAuth: true }
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products').then((m) => m.Products),
    title: 'Products',
    data: { needsAuth: true }
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
    title: 'Login',
    data: { needsAuth: false }
  }
];
