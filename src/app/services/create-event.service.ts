import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateEventService {
  constructor() {}

  private createEvent: WritableSignal<() => void> = signal(() => {
    console.log('event fired');
  });

  getFunctionSignal() {
    return this.createEvent;
  }

  setFunctionSignal(newFunction: () => void) {
    this.createEvent.set(newFunction);
  }
}
