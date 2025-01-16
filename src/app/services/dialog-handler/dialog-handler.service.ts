import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogHandlerService {
  private createEventVisible: WritableSignal<boolean> = signal(false);
  private editEventVisible: WritableSignal<boolean> = signal(false);

  openCreateEvent(): void {
    this.createEventVisible.set(true);
  }

  closeCreateEvent(): void {
    this.createEventVisible.set(false);
  }

  createEventState(): WritableSignal<boolean> {
    return this.createEventVisible;
  }

  openEditEvent(): void {
    this.editEventVisible.set(true);
  }

  closeEditEvent(): void {
    this.editEventVisible.set(false);
  }

  editEventState(): WritableSignal<boolean> {
    return this.editEventVisible;
  }
}
