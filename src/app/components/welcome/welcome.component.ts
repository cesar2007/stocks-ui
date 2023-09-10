import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userEmail: string = '';

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    this.userEmail = this.route.snapshot.params['email'];
    this.dataService.getStocksCatalog().subscribe((response: any) => {
      this.stocks = response['data'];
    });
    this.formGroup = new FormGroup({
      selectedStock: new FormControl<Stock | null>(null),
    });
  }



}
