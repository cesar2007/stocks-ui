import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';
import { Stock } from 'src/app/models/stock.model';
import { CountryService } from 'src/app/services/country.service';
import { DataStocksService } from 'src/app/services/data-stocks.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'nasa-chart',
  templateUrl: './nasa-chart.component.html',
  styleUrls: ['./nasa-chart.component.scss'],
})
export class NasaChartComponent {
  @ViewChild('barChart', { static: true }) barChartCanvas!: ElementRef;
  barChart!: Chart;
  yValues: number[] = [];
  xValues: string[] = [];

  data!: any;

  catalogResponse!: Stock[];

  stocks!: Stock[];

  formGroup!: FormGroup;

  filteredStocks!: Stock[];

  myFavoriteStock: string = "AA";

  ngOnInit() {
    this.dataService.getStocksCatalog().subscribe((response: any) => {
      this.stocks = response['data'];
    });
    this.formGroup = new FormGroup({
      selectedStock: new FormControl<Stock | null>(null),
    });
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

  constructor(private dataService: DataStocksService, private countryService: CountryService) {}

  async getStocksData() {
    return new Promise<void>((resolve, reject) => {
      setTimeout(async () => {
        this.dataService.getStocksDataBySymbol(this.myFavoriteStock).subscribe((data: any) => {
          this.data = data;
          console.log(data);
          const aaplData = data[this.myFavoriteStock];
          const applDataValues = aaplData.values;
          applDataValues.forEach((item: { close: any }) => {
            this.yValues.push(Number(item.close));
          });
          applDataValues.forEach((item: { datetime: any }) => {
            const dateObject = new Date(item.datetime);
            const timeString = dateObject.toLocaleTimeString('en-US', {
              hour12: false,
            });
            this.xValues.push(timeString);
          });
          this.createStocksChart(this.myFavoriteStock);
          resolve();
        });
      }, 1500);
    });
  }

  saveStock(){
    console.log("guardando...");
    this.myFavoriteStock = this.formGroup.value['selectedStock'].symbol;
    console.log(this.myFavoriteStock);
    this.formGroup.reset();
  }

  async ngAfterViewInit() {
    this.callCreateStocksChart();
  }

  async callCreateStocksChart() {
    try {
      await this.getStocksData();
    } catch (error) {
      console.log('Error fetching stocks data: ', error);
    }
  }

  createStocksChart(labelValue: string) {
    const ctx = this.barChartCanvas.nativeElement.getContext('2d');
    this.barChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.xValues.reverse(),
        datasets: [
          {
            label: `${labelValue} Stocks`,
            data: this.yValues.reverse(),
            backgroundColor: ['rgba(255, 99, 132, 0.2'],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function (value, index, ticks) {
                return value;
              },
            },
          },
        },
      },
    });
  }

}
