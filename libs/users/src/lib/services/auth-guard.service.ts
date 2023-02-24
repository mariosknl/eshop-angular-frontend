import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router, private localstorageToken: LocalstorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //   const token = this.localstorageToken.getToken();

    //   if (token) {
    //     const tokenDecode = JSON.parse(atob(token.split('.')[1]));
    //     if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) return true;
    //   }

    //   this.route.navigate(['/login']);
    //   return false;
    // }

    // private _tokenExpired(expiration): boolean {
    //   return Math.floor(new Date().getTime() / 1000) >= expiration;
    return true;
  }
}
