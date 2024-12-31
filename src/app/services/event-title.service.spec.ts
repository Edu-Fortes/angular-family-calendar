import { TestBed } from '@angular/core/testing';

import { EventTitleService } from './event-title.service';

describe('EventTitleService', () => {
  let service: EventTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
