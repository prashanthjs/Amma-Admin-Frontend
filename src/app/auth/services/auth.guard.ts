import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.authService.isLoggedIn().map((res: boolean) => {
        if (!res) {
          return this.router.navigate(['/login']);
        }
        if (route.data.hasOwnProperty('privilege') && Array.isArray(route.data.privilege)) {
          if (!this.authService.hasPrivilege(route.data.privilege)) {
            return this.router.navigate(['/access-denied']);
          }
        }
        return true;
      }
    );
  }
}
