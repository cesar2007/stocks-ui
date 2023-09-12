import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  getDataByEmail(){
    return this.http.get('http://localhost:8080/api/v1/user?email=cesar@gmail.com');
  }

}
