import { Injectable, signal, WritableSignal } from '@angular/core';
import { DateSelectArg } from '@fullcalendar/core/index.js';

@Injectable({
  providedIn: 'root',
})
export class SelectionInfoService {
  constructor() { }

  private selectionInfo: WritableSignal<DateSelectArg> = signal({
    start: new Date(),
    end: new Date(),
    startStr: '',
    endStr: '',
    allDay: false,
    jsEvent: null,
    view: {} as any, // Replace with a valid ViewApi object
  });

  setData(update: DateSelectArg) {
    this.selectionInfo.set(update);
  }

  getData() {
    return this.selectionInfo;
  }
}
