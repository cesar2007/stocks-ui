import { TestBed } from '@angular/core/testing';

import { DataStocksService } from './data-stocks.service';

describe('DataStocksService', () => {
  let service: DataStocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataStocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
