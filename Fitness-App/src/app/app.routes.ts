import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'routine-list',
    loadComponent: () => import('./routine-list/routine-list.page').then(m => m.RoutineListPage)
  },
  {
    path: 'routine-detail',
    loadComponent: () => import('./routine-detail/routine-detail.page').then( m => m.RoutineDetailPage)
  },

  {
    path: 'routine-detail/:id',
    loadComponent: () => import('./routine-detail/routine-detail.page').then(m => m.RoutineDetailPage)
  }


];
