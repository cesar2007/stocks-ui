import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/authResponse.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  basicLogin(email: string){
    const params = new HttpParams().set('email', email);
    return this.http.get<AuthResponse>('http://localhost:8080/api/v1/signup', { params });
  }
}
