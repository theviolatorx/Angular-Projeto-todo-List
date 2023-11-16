import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserToken } from '../models/user-token';
import { LoginCredentials } from '../models/login-credentials.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiBaseUrl = 'http://localhost:5000/auth/login';

  constructor(private http: HttpClient) {}

  public login(credentials: LoginCredentials): Observable<UserToken> {
    return this.http.post<UserToken>(this.apiBaseUrl, credentials);
  }

  public isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('TOKEN');
    return token ? of(true) : of(false);
  }

  public checkUserRoles(roles: string[]): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      const userRoles = JSON.parse(localStorage.getItem('USER_ROLES') || '[]');

      if (userRoles.some((role: string) => roles.includes(role))) {
        subscriber.next(true);
      }

      subscriber.next(false);
    });
  }
}
