import { TestBed } from '@angular/core/testing';

import { DatesHandlerService } from './dates-handler.service';

describe('DatesHandlerService', () => {
  let service: DatesHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatesHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
