import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsComponent } from './components/charts/charts.component';
import { NasaChartComponent } from './components/nasa-chart/nasa-chart.component';
import { IssChartComponent } from './components/iss-chart/iss-chart.component';
import { ChartStocksComponent } from './components/chart-stocks/chart-stocks.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    NasaChartComponent,
    IssChartComponent,
    ChartStocksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
