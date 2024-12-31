import { Component, computed, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreateEventDialogStateService } from '../../services/create-event-dialog-state.service';
import { SelectionInfoService } from '../../services/selection-info.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarComponent } from '../calendar/calendar.component';
import { EventTitleService } from '../../services/event-title.service';

@Component({
  selector: 'app-create-dialog',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.css',
})
export class CreateDialogComponent {
  visible;
  selection;
  eventTitleInput = new FormControl('');

  constructor(
    private dataService: CreateEventDialogStateService,
    private selectionService: SelectionInfoService,
    private eventTitleService: EventTitleService
  ) {
    this.visible = this.dataService.getData();
    this.selection = this.selectionService.getData();
  }

  formatedDate: Signal<any> = computed(() => {
    return this.selection().start.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  });

  createEvent() {
    this.eventTitleService.setData(this.eventTitleInput.value);
    this.visible.set(false);
  }
}
