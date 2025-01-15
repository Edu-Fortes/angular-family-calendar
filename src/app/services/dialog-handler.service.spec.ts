import { TestBed } from '@angular/core/testing';

import { DialogHandlerService } from './dialog-handler.service';

describe('DialogHandlerService', () => {
  let service: DialogHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
