import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Stock } from 'src/app/models/stock.model';
import { DataStocksService } from 'src/app/services/data-stocks.service';
import jwt_decode from 'jwt-decode';
import { UserDataService } from '../../services/user-data.service';

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
  savedStocks: string[] = [];

  preferredStocksObject: Stock[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataStocksService, private router: Router, private userDataService: UserDataService){}

  ngOnInit() {
    const decodedToken: any = jwt_decode(String(sessionStorage.getItem('token')));
    this.userEmail = decodedToken.sub;
    this.dataService.getStocksCatalog().subscribe((response: any) => {
      this.stocks = response['data'];
      this.buildStocksObject();
    });
    this.formGroup = new FormGroup({
      selectedStockSymbol: new FormControl<Stock | null>(null),
    });
    this.userDataService.getDataByEmail().subscribe( (data : any) => {
      this.savedStocks = data.favoriteStocks.map((stock : any) => stock.symbol);
    })
  }

  saveStockInDatabase(){
    this.selectedStockSymbol = this.formGroup.value['selectedStockSymbol'].symbol;
    this.savedStocks.push(this.selectedStockSymbol);
    const jsonData = {
      myUpdatedStocks: this.savedStocks
    };
    this.dataService.saveNewStocks(jsonData).subscribe(data => {
      this.buildStocksObject();
    })
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

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  deleteStockFromTable(stockSymbol: string){
    this.dataService.deleteStock(this.userEmail, stockSymbol).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/home'])
    })
  }

  goToChartPage(symbol: string){
   this.router.navigate(['chart', symbol]);
  }

}
