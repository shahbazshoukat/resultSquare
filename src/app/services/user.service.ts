import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/models';
import { isPlatformBrowser } from '@angular/common';
import { environment as ENV } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {

  username = '';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  setUserName(name: string) {

    this.username = name;

  }

  addUser(name: string, email: string, password: string) {
    const user: User = {
      _id: null,
      name: name,
      email: email,
      password: password
    };
    return this.http.post<{message: string}>(ENV.apiURL + '/api/signUp', user);
  }

  loginUser(email: string, password: string) {
    const authData = { email: email, password: password };
    return this.http
      .post<{
        data: {
          token: string;
        expiresIn: number;
        userId: string;
        name: string;
        email: string;
        };
        message: string;
        success: boolean;
      }>(ENV.apiURL + '/api/login', authData);
  }

  logout() {
    return this.http.get<{success: boolean, message: string}>(ENV.apiURL + '/api/logout');
  }

  getToken() {

    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }

  }

  getUserName() {

    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('username');
    }

  }

  saveAuthData(token: string, expirationDate: Date, username: string, userId: string) {

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('expiration', expirationDate.toISOString());
      localStorage.setItem('username', username);
      localStorage.setItem('userId', userId);
    }

  }

  clearAuthData() {

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    }

  }

}
