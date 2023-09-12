import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NasaChartComponent } from './components/nasa-chart/nasa-chart.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: WelcomeComponent},
  {path: 'chart/:stock', component: NasaChartComponent},

  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
