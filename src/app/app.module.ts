import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsComponent } from './components/charts/charts.component';
import { NasaChartComponent } from './components/nasa-chart/nasa-chart.component';
import { IssChartComponent } from './components/iss-chart/iss-chart.component';
import { ChartStocksComponent } from './components/chart-stocks/chart-stocks.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CountryService } from './services/country.service';

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
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
