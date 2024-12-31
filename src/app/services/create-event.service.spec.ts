import { TestBed } from '@angular/core/testing';

import { CreateEventService } from './create-event.service';

describe('CreateEventService', () => {
  let service: CreateEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
