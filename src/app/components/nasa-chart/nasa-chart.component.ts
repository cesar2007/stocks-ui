import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  selectedStockSymbol: string = "AA";
  userEmail: string = '';

  constructor(private dataService: DataStocksService, private countryService: CountryService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userEmail = this.route.snapshot.params['email'];
    this.dataService.getStocksCatalog().subscribe((response: any) => {
      this.stocks = response['data'];
    });
    this.formGroup = new FormGroup({
      selectedStockSymbol: new FormControl<Stock | null>(null),
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

  async getStocksData() {
    this.yValues = [];
    this.xValues = [];
    return new Promise<void>((resolve, reject) => {
      setTimeout(async () => {
        this.dataService.getStocksDataBySymbol(this.selectedStockSymbol).subscribe((data: any) => {
          this.data = data;
          const aaplData = data[this.selectedStockSymbol];
          const applDataValues = aaplData.values;
          applDataValues.forEach((item: { close: any }) => {
            this.yValues.push(Number(item.close));
          });
          applDataValues.forEach((item: { datetime: any }) => {
            const dateObject = new Date(item.datetime);
            const hours = dateObject.getHours().toString().padStart(2, '0');
            const minutes = dateObject.getMinutes().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes}`;
            this.xValues.push(timeString);
          });
          resolve();
        });
      }, 500);
    });
  }

  saveStock(){
    this.selectedStockSymbol = this.formGroup.value['selectedStockSymbol'].symbol;
    const stockName = this.formGroup.value['selectedStockSymbol'].name;
    this.getStocksData();
    setTimeout(() => {
      this.createStocksChart(stockName);
    }, 1500)
    this.formGroup.reset();
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
    if(this.barChart){
      this.barChart.clear();
      this.barChart.destroy();
    }
    this.barChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.xValues.reverse(),
        datasets: [
          {
            label: labelValue,
            data: this.yValues.reverse(),
            backgroundColor: ['rgba(84, 84, 99, 0.2'],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function (value, index, ticks) {
                return '$' + Number(value).toFixed(2);
              },
            },
          },
        },
      },
    });
  }

}
