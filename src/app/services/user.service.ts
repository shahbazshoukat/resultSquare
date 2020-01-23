import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AlertService } from 'ngx-alerts';


@Injectable({ providedIn: 'root' })
export class UsersService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private user: User;
  private username: string;
  private users: any[] = [];
  private emailStatus;

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) {}

  getToken() {
    return this.token;
  }
  getEmailStatus() {
    return this.emailStatus;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsAuthenticated() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  getUser() {
    return this.user;
  }
  getUsername() {
    return this.username;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  addUser(name: string, email: string, password: string) {
    const user: User = {
      _id: null,
      name: name,
      email: email,
      password: password
    };
    this.http.post<{message: string}>('/api/signUp', user).subscribe(
      response => {
      this.alertService.success(response.message);
    },
    error => {
      if (error && error.error && error.error.message) {
        this.alertService.danger(error.error.message);
      }
    });
  }

  loginUser(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http
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
      }>('/api/login', authData)
      .subscribe(response => {
        const token = response.data.token;
        this.token = token;
        this.user = {
          _id: response.data.userId,
          name: response.data.name,
          email: response.data.email,
          password: ''
        };

        if (token) {
          const expiresInDuration = response.data.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(
            token,
            expirationDate,
            this.user.name,
            this.user._id
          );
          this.router.navigate(['/rs-admin/dashboard']);
        }
      },
      error => {

        if (error && error.error && error.error.message) {
          this.alertService.danger(error.error.message);
        }

      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.username = authInformation.username;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.http.get<{success: boolean, message: string}>('/api/logout').subscribe(
      response => {

      this.alertService.success(response.message);

    },
    error => {

      if (error && error.error && error.error.message) {
        this.alertService.danger(error.error.message);
      }

    });
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.user = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    username: string,
    userId: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const username = localStorage.getItem('username');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      username: username,
      expirationDate: new Date(expirationDate)
    };
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<{ name: string; email: any }>(
      '/api/user' + userId
    );
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getUsers() {
    let usr;

    this.http
      .get<{ message: string; users: any }>('/api/user')
      .subscribe(responseData => {
        responseData.users.forEach(user => {
          usr = {
            _id: user._id,
            name: user.name,
            email: user.email,
            reqStatus: false
          };
          this.users.push(usr);
        });
      });
    return this.users;
  }
  getUserBId(userId: string) {
    return { ...this.users.find(u => u._id === userId) };
  }
}
