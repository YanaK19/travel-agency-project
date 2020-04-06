import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthorizationGuard  implements CanActivate, CanActivateChild {
  constructor(private auth: AuthorizationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.auth.isAuthenticated() && this.auth.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/login'],
        {queryParams: {accessForbidden: true}}
        );

      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
