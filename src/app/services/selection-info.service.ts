import { Injectable, signal, WritableSignal } from '@angular/core';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root',
})
export class SelectionInfoService {
  constructor() {}

  private selectionInfo: WritableSignal<DateSelectArg> = signal({
    start: new Date(),
    end: new Date(),
    startStr: '',
    endStr: '',
    allDay: false,
    jsEvent: null,
    view: {} as any, // Replace with a valid ViewApi object
  });

  private eventClickInfo: any = signal({}); // ARRUMAR MUITO ESSE TIPO

  private eventData: any = signal({});

  setData(update: DateSelectArg) {
    this.selectionInfo.set(update);
  }

  getData() {
    return this.selectionInfo;
  }

  setEventClick(update: any) {
    // ARRUMAR ESSE TIPO
    this.eventClickInfo.set(update);
  }

  getEventClick() {
    return this.eventClickInfo;
  }

  setEventData(update: any) {
    this.eventData.set(update);
  }

  getEventData() {
    return this.eventData;
  }
}
