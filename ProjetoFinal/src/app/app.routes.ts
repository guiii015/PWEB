import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Crud } from './components/crud/crud';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'home',
    component: Home,
    canActivate: [AuthGuard], 
  },
  {
    path: 'crud',
    component: Crud,
    canActivate: [AuthGuard], 
  },
  {
    path: 'crud/:id',
    component: Crud,
    canActivate: [AuthGuard], 
  },
  {
    path: '**',             
    redirectTo: '/home'   
    //reireciona qualquer rota não especificada para home. 
  }
];