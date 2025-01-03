import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditEventDialogStateService {
  private visible: WritableSignal<boolean> = signal(false);

  setState(update: boolean) {
    this.visible.set(update);
  }

  getState() {
    return this.visible;
  }
}
