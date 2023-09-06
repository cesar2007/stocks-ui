import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStocksService {


  private API_LOCAL_URL = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  getStocksDataWithLocalAPI(){
    return this.http.get(`${this.API_LOCAL_URL}/data`);
  }

  getStocksCatalog(){
    return this.http.get(`${this.API_LOCAL_URL}/stocks-catalog`);
  }


}
