import { TestBed } from '@angular/core/testing';

import { TrucksOnMapService } from './trucks-on-map.service';

describe('TrucksOnMapService', () => {
  let service: TrucksOnMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrucksOnMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
