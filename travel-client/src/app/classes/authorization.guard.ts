import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthorizationService} from "../services/authorization.service";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";


@Injectable({providedIn: "root"})
export class AuthorizationGuard  implements CanActivate, CanActivateChild{
  constructor(private auth: AuthorizationService,
              private router: Router){
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isAuthenticated()){
      return of(true)
    }else{
      this.router.navigate(['/login'],
        {queryParams: {accessForbidden: true}}
        );

      return of(false);
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state)
  }
}
