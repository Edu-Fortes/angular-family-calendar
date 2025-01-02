import { Component, computed, Signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreateEventDialogStateService } from '../../services/create-event-dialog-state.service';
import { SelectionInfoService } from '../../services/selection-info.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Select } from 'primeng/select';

interface FamilyMember {
  name: string;
  color: string;
}

@Component({
  selector: 'app-create-dialog',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    Select,
    FloatLabelModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.css',
})
export class CreateDialogComponent {
  visible;
  selection;

  constructor(
    private dataService: CreateEventDialogStateService,
    private selectionService: SelectionInfoService
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

  createEventForm = new FormGroup({
    eventTitle: new FormControl(''),
    familyMember: new FormControl<FamilyMember | null>(null),
  });

  familyMembers = [
    {
      name: 'Toda a família',
      color: 'sky'
    },
    {
      name: 'Mãe',
      color: 'red',
    },
    {
      name: 'Pai',
      color: 'yellow',
    },
    {
      name: 'Filho',
      color: 'green',
    },
    {
      name: 'Filha',
      color: 'pink',
    },
  ];

  createEvent() {
    const calendarApi = this.selection().view.calendar;

    calendarApi.addEvent({
      title: this.createEventForm.value.eventTitle ?? 'Evento sem título',
      start: this.selection().start,
      end: this.selection().end,
      allDay: false,
      color: this.createEventForm.value.familyMember?.color ?? 'red',
    });

    this.visible.set(false);
    this.createEventForm.reset();
  }
}
