import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasaChartComponent } from './nasa-chart.component';

describe('NasaChartComponent', () => {
  let component: NasaChartComponent;
  let fixture: ComponentFixture<NasaChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NasaChartComponent]
    });
    fixture = TestBed.createComponent(NasaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
