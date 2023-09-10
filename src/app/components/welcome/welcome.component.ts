import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Stock } from 'src/app/models/stock.model';
import { DataStocksService } from 'src/app/services/data-stocks.service';

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

  constructor(private route: ActivatedRoute, private dataService: DataStocksService){}

  ngOnInit() {
    this.userEmail = this.route.snapshot.params['email'];
    this.dataService.getStocksCatalog().subscribe((response: any) => {
      this.stocks = response['data'];
    });
    this.formGroup = new FormGroup({
      selectedStockSymbol: new FormControl<Stock | null>(null),
    });
  }

  saveStock(){
    this.selectedStockSymbol = this.formGroup.value['selectedStockSymbol'].symbol;
    const stockName = this.formGroup.value['selectedStockSymbol'].name;
    this.savedStocks.push(this.selectedStockSymbol);
    console.log(this.savedStocks);
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

}
