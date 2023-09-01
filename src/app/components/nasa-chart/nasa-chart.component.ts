import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { DataStocksService } from 'src/app/services/data-stocks.service';

@Component({
  selector: 'nasa-chart',
  templateUrl: './nasa-chart.component.html',
  styleUrls: ['./nasa-chart.component.scss'],
})
export class NasaChartComponent {
  @ViewChild('barChart', { static: true }) barChartCanvas!: ElementRef;
  barChart!: Chart;
  xlabels: any = [];
  ytemps: any[] = [];

  yValues: number[] = [];
  xValues: string[] = [];

  data!: any;
  private dataSubscription!: Subscription;
  condensedData: any;

  constructor(private dataService: DataStocksService) {}

  async getData() {
    return new Promise<void>((resolve, reject) => {
      setTimeout(async () => {
        const response = await fetch('assets/ZonAnn.Ts+dSST.csv');
        const data = await response.text();
        const table = data.split('\n').slice(1);
        table.forEach((row) => {
          const columns = row.split(',');
          const year = columns[0];
          this.xlabels.push(year);
          const temp = columns[1];
          this.ytemps.push(parseFloat(temp) + 14);

        });
        resolve();
      }, 3000);
    });
  }

  async getStocksData(){
    return new Promise<void>((resolve, reject) => {
      setTimeout(async () => {
        this.dataService.getStocksDataWithLocalAPI()
        .subscribe((data : any) => {
          this.data = data;
          console.log(data);

          const aaplData = data.AAPL;
          console.log(aaplData);
          const applDataValues = aaplData.values;
          console.log(applDataValues);

          applDataValues.forEach((item : {close: any}) =>{
            this.yValues.push(Number(item.close));
          });
          console.log(this.yValues);

          applDataValues.forEach((item : {datetime: any}) =>{
            const dateObject = new Date(item.datetime);
            const timeString = dateObject.toLocaleTimeString('en-US', { hour12: false });
            this.xValues.push(timeString);
          })
          this.createStocksChart('AAPL');
          resolve();
        });
      }, 3000);
    });
  }

  async ngAfterViewInit() {
    this.callCreateStocksChart();
  }

  async callCreateStocksChart(){
    try {
      await this.getStocksData();
    } catch (error){
      console.log('Error fetching stocks data: ', error);
    }
  }

  async callCreateBarChart(){
    try {
      await this.getData();
      this.createBarChart();
    } catch (error){
      console.log('Error fetching stocks data: ', error);
    }
  }

  createBarChart() {
    const ctx = this.barChartCanvas.nativeElement.getContext('2d');
    console.log(this.ytemps);
    this.barChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.xlabels,
        datasets: [
          {
            label: 'Global Average Temperature',
            data: this.ytemps,
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
                return value ;
              },
            },
          },
        },
      },
    });
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
                return value ;
              },
            },
          },
        },
      },
    });
  }
}
