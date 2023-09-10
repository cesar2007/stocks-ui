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
import { CardModule } from 'primeng/card';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    NasaChartComponent,
    IssChartComponent,
    ChartStocksComponent,
    LoginComponent,
    ErrorComponent,
    WelcomeComponent
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
    AutoCompleteModule,
    CardModule,
    TableModule

  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
