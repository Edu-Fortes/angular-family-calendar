import { TestBed } from '@angular/core/testing';

import { CalendarInteractionService } from './calendar-interaction.service';

describe('CalendarInteractionService', () => {
  let service: CalendarInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
