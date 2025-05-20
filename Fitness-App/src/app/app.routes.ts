import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'routine-list',
    loadComponent: () => import('./routine-list/routine-list.page').then( m => m.RoutineListPage)
  },
  {
    path: 'routine-detail/:id',
    loadComponent: () => import('./routine-detail/routine-detail.page').then( m => m.RoutineDetailPage)
  },{
    path: 'routine-detail',
    loadComponent: () => import('./routine-detail/routine-detail.page').then( m => m.RoutineDetailPage)
  },


];
