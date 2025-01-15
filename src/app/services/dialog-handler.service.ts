import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogHandlerService {
  private createEventVisible: WritableSignal<boolean> = signal(false);
  private editEventVisible: WritableSignal<boolean> = signal(false);

  openCreateEvent() {
    this.createEventVisible.set(true);
  }

  closeCreateEvent() {
    this.createEventVisible.set(false);
  }

  createEventState() {
    return this.createEventVisible;
  }

  openEditEvent() {
    this.editEventVisible.set(true);
  }

  closeEditEvent() {
    this.editEventVisible.set(false);
  }

  editEventState() {
    return this.editEventVisible;
  }
}
