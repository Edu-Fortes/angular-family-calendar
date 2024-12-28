import { TestBed } from '@angular/core/testing';

import { CreateEventDialogStateService } from './create-event-dialog-state.service';

describe('CreateEventDialogStateService', () => {
  let service: CreateEventDialogStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEventDialogStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
