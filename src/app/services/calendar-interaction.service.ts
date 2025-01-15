import { Injectable, WritableSignal, signal } from '@angular/core';
import { DateSelectArg } from '@fullcalendar/core/index.js';

@Injectable({
  providedIn: 'root',
})
export class CalendarInteractionService {
  constructor() {}

  private dateSelection: WritableSignal<DateSelectArg> = signal({
    start: new Date(),
    end: new Date(),
    startStr: '',
    endStr: '',
    allDay: false,
    jsEvent: null,
    view: {} as any, // Replace with a valid ViewApi object});
  });

  setDateSelection(update: DateSelectArg) {
    this.dateSelection.set(update);
  }

  getDateSelection() {
    return this.dateSelection;
  }
}
