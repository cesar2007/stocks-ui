import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/authResponse.model';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import  jwt_decode  from 'jwt-decode';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedInState!: boolean;
  private userLoggedSubject = new BehaviorSubject<boolean>(this.isLoggedInState);
  userLogged$ = this.userLoggedSubject.asObservable();
  private userProfiles!: string [];

  constructor(private http: HttpClient) { }

  basicLogin(email: string){
    const params = new HttpParams().set('email', email);
    return this.http.get<AuthResponse>('http://localhost:8080/api/v1/signup', { params });
  }

  basicLoginWithEncryption(email: string, password: string){
    this.userProfiles = [];
    let basicAuthHeaderString = 'Basic ' + window.btoa(email + ':' + password);
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.http.get(`http://localhost:8080/api/v1/auth`, {headers, responseType: 'text' as 'json'})
      .pipe(
        map((data: any) => {
          this.isLoggedInState = true;
          sessionStorage.setItem(TOKEN, data);
          const decodedToken: any = jwt_decode(data);
          //this.userProfiles = decodedToken.roles;
          return data;
        }),
        catchError((error: any) => {
          console.error('error during authentication:', error);
          return throwError(error);
        })
      )
  }

  isLoggedIn(){
    let user = sessionStorage.getItem(TOKEN);
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem(TOKEN);
  }

  setUserLogged(isLogged: boolean){
    this.isLoggedInState = isLogged;
    this.userLoggedSubject.next(isLogged);
  }

}

