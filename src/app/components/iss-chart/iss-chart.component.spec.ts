import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssChartComponent } from './iss-chart.component';

describe('IssChartComponent', () => {
  let component: IssChartComponent;
  let fixture: ComponentFixture<IssChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssChartComponent]
    });
    fixture = TestBed.createComponent(IssChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
