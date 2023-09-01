import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStocksComponent } from './chart-stocks.component';

describe('ChartStocksComponent', () => {
  let component: ChartStocksComponent;
  let fixture: ComponentFixture<ChartStocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartStocksComponent]
    });
    fixture = TestBed.createComponent(ChartStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
