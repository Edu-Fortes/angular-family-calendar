import { Injectable, WritableSignal, signal } from '@angular/core';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core/index.js';

@Injectable({
  providedIn: 'root',
})
export class CalendarInteractionService {
  constructor() {}

  private dateSelection: WritableSignal<DateSelectArg> = signal(
    {} as DateSelectArg
  );

  private eventClick: WritableSignal<EventClickArg> = signal(
    {} as EventClickArg
  );

  setDateSelection(update: DateSelectArg): void {
    this.dateSelection.set(update);
  }

  getDateSelection(): WritableSignal<DateSelectArg> {
    return this.dateSelection;
  }

  setEventClick(update: EventClickArg): void {
    this.eventClick.set(update);
  }

  getEventClick(): WritableSignal<EventClickArg> {
    return this.eventClick;
  }
}
