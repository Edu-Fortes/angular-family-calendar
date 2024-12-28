import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateEventDialogStateService {
  private visible: WritableSignal<boolean> = signal(false);

  setData(update: boolean) {
    this.visible.set(update);
  }

  getData() {
    return this.visible;
  }
}
