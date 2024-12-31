import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventTitleService {
  constructor() {}

  private eventTitle: WritableSignal<string | null> = signal('');

  setData(update: string | null) {
    this.eventTitle.set(update);
  }

  getData() {
    return this.eventTitle;
  }
}
