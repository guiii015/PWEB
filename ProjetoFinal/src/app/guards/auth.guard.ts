import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    
    if (localStorage.getItem('isLoggedIn') === 'true') {
      console.log('AuthGuard: Usuário está logado. Permite acesso.');
      return true;
    } else {
      console.log('AuthGuard: Usuário NÃO está logado. Redirecionando para login.');
      return this.router.createUrlTree(['/login']);
    }
  }
}