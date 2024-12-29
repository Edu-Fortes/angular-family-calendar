import { TestBed } from '@angular/core/testing';

import { SelectionInfoService } from './selection-info.service';

describe('SelectionInfoService', () => {
  let service: SelectionInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectionInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
