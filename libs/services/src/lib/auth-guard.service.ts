/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {


  constructor(
    private router: Router,
    private localStorageToken: LocalstorageService)
   { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();

    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
     
      if(tokenDecode.isAdmin && !this._tokenExpired(tokenDecode)) return true
    }
    this.router.navigate(['/login']);
      return false;
  }

  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}

