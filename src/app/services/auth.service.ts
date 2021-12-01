import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, tap, switchMap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { API } from 'src/api';

export interface LoginForm {
  email: string;
  senha: string;
};

export const JWT_NAME = 'blog-token';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginForm: LoginForm) {

    return this.http.post<any>(API+'/login', {email: loginForm.email, senha: loginForm.senha}).pipe(
      map((token) => {
        console.log('token');
        localStorage.setItem(JWT_NAME, token.token);
        return token;
      })
    )
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
  }

  register(user: User) {
    return this.http.post<any>(API+'/signup', user).pipe(
      tap(user => console.log(user)),
      map(user => user)
    )
  }

  isAuthenticated(): boolean {
    const token: any = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserId(): Observable<number>{
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: any) => of(this.jwtHelper.decodeToken(jwt)).pipe(
        map((jwt) => (jwt as any).user.id))
      )
    )
  }

}
