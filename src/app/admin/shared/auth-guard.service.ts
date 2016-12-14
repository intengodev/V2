
import { Injectable }     from '@angular/core';
import { CanActivate, 
         ActivatedRouteSnapshot, 
         RouterStateSnapshot 
       }                  from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard#canActivate called');
    //Implement a Auth service here: https://angular.io/docs/ts/latest/guide/router.html#!#can-activate-guard
    let username = route.queryParams['username'];
    let password = route.queryParams['password'];

    if(username == 'peb7268' && password == 'tp') return true
    return false;
  }
}