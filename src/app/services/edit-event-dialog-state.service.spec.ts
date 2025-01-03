import { TestBed } from '@angular/core/testing';

import { EditEventDialogStateService } from './edit-event-dialog-state.service';

describe('EditEventDialogStateService', () => {
  let service: EditEventDialogStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditEventDialogStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
