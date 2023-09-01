import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataStocksService } from 'src/app/services/data-stocks.service';

@Component({
  selector: 'chart-stocks',
  templateUrl: './chart-stocks.component.html',
  styleUrls: ['./chart-stocks.component.scss']
})
export class ChartStocksComponent {

  data: any;
  private dataSubscription!: Subscription;
  condensedData: any;

  constructor(private dataService: DataStocksService) {}

  ngOnInit() {
    // this.dataService.fetchStocksData()
    //   .subscribe((data) => {
    //     this.data = data;
    //     const jsonText = JSON.stringify(this.data);
    //     console.log(this.data.values);
    //     this.data.values.forEach((item: { close: any; }) => {
    //       console.log(item.close);
    //     });

    //   });

    this.dataService.getStocksDataWithLocalAPI()
      .subscribe( (data)=> {
        console.log(data);
      })
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
