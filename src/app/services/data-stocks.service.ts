import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStocksService {

  private API_KEY : string = '91d9f3415cdb429c9379d3de3e304d76';

  private API_URL_STOCKS = `https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=${this.API_KEY}`;

  private API_LOCAL_URL = "http://localhost:8080/api/v1/data";

  constructor(private http: HttpClient) {}

  fetchStocksData(): Observable<any> {
    return this.http.get(this.API_URL_STOCKS)
  }

  getStocksDataWithLocalAPI(){
    return this.http.get(this.API_LOCAL_URL);
  }
}
