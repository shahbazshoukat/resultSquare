import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UsersService} from '@app/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UsersService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.userService.getToken();
    if (authToken) {

      const authRequest = req.clone({ setHeaders: { 'x-access-token': authToken } });
      return next.handle(authRequest);

    } else {

      const authRequest = req.clone({ setHeaders: { 'x-access-token': 'null' } });
      return next.handle(authRequest);

    }
  }
}
