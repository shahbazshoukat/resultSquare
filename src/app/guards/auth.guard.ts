import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '@app/services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UsersService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const token = this.userService.getToken();
    if (!token) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
