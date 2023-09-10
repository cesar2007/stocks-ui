import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Stock } from 'src/app/models/stock.model';
import { DataStocksService } from 'src/app/services/data-stocks.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userEmail: string = '';
  stocks!: Stock[];
  formGroup!: FormGroup;
  filteredStocks!: Stock[];
  selectedStockSymbol: string = "AA";
  savedStocks: String[] = [];

  preferredStocksObject: Stock[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataStocksService){}

  ngOnInit() {
    const decodedToken: any = jwt_decode(String(sessionStorage.getItem('token')));
    this.userEmail = decodedToken.sub;
    this.savedStocks = decodedToken.stocks;
    this.dataService.getStocksCatalog().subscribe((response: any) => {
      this.stocks = response['data'];
      this.buildStocksObject();
      console.log(this.preferredStocksObject);
    });
    this.formGroup = new FormGroup({
      selectedStockSymbol: new FormControl<Stock | null>(null),
    });
  }

  saveStock(){
    this.selectedStockSymbol = this.formGroup.value['selectedStockSymbol'].symbol;
    const stockName = this.formGroup.value['selectedStockSymbol'].name;
    this.savedStocks.push(this.selectedStockSymbol);
    this.buildStocksObject();
  }

  filterStock(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < (this.stocks as any[]).length; i++) {
        let stock = (this.stocks as any[])[i];
        if (stock.symbol.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(stock);
        }
    }
    this.filteredStocks = filtered;
  }

  buildStocksObject(){
    this.preferredStocksObject = this.stocks.filter(stock => this.savedStocks.includes(stock.symbol));
  }

}
