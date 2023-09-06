import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Stock } from '../models/stock.model';

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
    return this.http.get<Stock[]>(`${this.API_LOCAL_URL}/stocks-catalog`);
  }

  getStocksDataBySymbol(symbols: string){
    const params = new HttpParams().set('symbols', symbols);
    return this.http.get(`${this.API_LOCAL_URL}/data-by-symbol`, { params });
  }


}
