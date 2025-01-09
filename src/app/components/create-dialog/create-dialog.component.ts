import { Component, computed, Signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreateEventDialogStateService } from '../../services/create-event-dialog-state.service';
import { SelectionInfoService } from '../../services/selection-info.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { formatDate, FormatDateOptions, formatRange } from '@fullcalendar/core';

interface FamilyMember {
  name: string;
  color: string;
  textColor: string;
}

@Component({
  selector: 'app-create-dialog',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToggleSwitchModule,
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
    const startDate: any = new Date(this.selection().startStr);
    const endDate: any = new Date(this.selection().endStr);
    const options: FormatDateOptions = {
      separator: ' a ',
      month: 'long',
      year: 'numeric',
      day: 'numeric',
      locale: 'pt-BR',
    };

    const numberOfSelectedDays = Math.floor(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    if (numberOfSelectedDays === 1)
      return formatDate(this.selection().startStr, options);
    else
      return formatRange(this.selection().startStr, this.selection().endStr, {
        ...options,
        isEndExclusive: true,
      });
  });

  createEventForm = new FormGroup({
    allDay: new FormControl<boolean>(false),
    eventTitle: new FormControl<string | null>(null),
    familyMember: new FormControl<FamilyMember | null>(null),
  });

  handleAllDay = () => {
    const startDate: any = new Date(this.selection().startStr);
    const endDate: any = new Date(this.selection().endStr);

    const numberOfSelectedDays = Math.floor(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    if (numberOfSelectedDays <= 1) return this.createEventForm.value.allDay;
    return true;
  };

  familyMembers = [
    {
      name: 'Toda a família',
      color: 'Aquamarine',
      textColor: 'DarkSlateGray',
    },
    {
      name: 'Mãe',
      color: 'red',
    },
    {
      name: 'Pai',
      color: 'black',
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
    this.selection().jsEvent?.preventDefault();

    const calendarApi = this.selection().view.calendar;

    calendarApi.addEvent({
      title: this.createEventForm.value.eventTitle ?? 'Evento sem título',
      start: this.selection().start,
      end: this.selection().end,
      allDay: this.handleAllDay() ?? false,
      color: this.createEventForm.value.familyMember?.color ?? 'sky',
      textColor: this.createEventForm.value.familyMember?.textColor,
      familyMember: this.createEventForm.value.familyMember?.name,
    });

    this.visible.set(false);
    this.createEventForm.reset();
  }
}
