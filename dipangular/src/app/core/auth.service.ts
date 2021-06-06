import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  private apiRoot = 'http://localhost:8000/auth/';

  constructor(private http: HttpClient) {}

  private setSession(authResult) {
    const token = authResult.token;
    const payload = jwt_decode(token) as JWTPayload;
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(username: string, password: string) {
    return this.http
      .post(this.apiRoot.concat('login/'), { username, password })
      .pipe(
        tap((response) => this.setSession(response)),
        shareReplay(),
      );
  }

  signup(
    username: string,
    email: string,
    password1: string,
    password2: string,
  ) {
    return this.http
      .post(this.apiRoot.concat('signup/'), {
        username,
        email,
        password1,
        password2,
      })
      .pipe(
        tap((response) => this.setSession(response)),
        shareReplay(),
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  refreshToken() {
    if (
      moment().isBetween(
        this.getExpiration().subtract(1, 'days'),
        this.getExpiration(),
      )
    ) {
      return this.http
        .post(this.apiRoot.concat('refresh-token/'), { token: this.token })
        .pipe(
          tap((response) => this.setSession(response)),
          shareReplay(),
        )
        .subscribe();
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token)),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
