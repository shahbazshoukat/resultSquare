import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute,
  ParamMap
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { UsersService } from "../services/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: UsersService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    let isAuth = this.authService.getIsAuthenticated();
    if (!isAuth) {
      this.router.navigate([""]);
    }
    return isAuth;
  }
}
