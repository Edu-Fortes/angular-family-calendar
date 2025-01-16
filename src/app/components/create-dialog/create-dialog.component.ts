import { Component, computed, inject, Signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DialogHandlerService } from '../../services/dialog-handler/dialog-handler.service';
import { CalendarInteractionService } from '../../services/calendar-interaction/calendar-interaction.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DatesHandlerService } from '../../services/dates-handler/dates-handler.service';
import { FamilyMember } from '../../models/family-member.interface';
import { familyMembers } from '../../models/family-members.data';

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
  private dialogService = inject(DialogHandlerService);
  private calendarInteractionService = inject(CalendarInteractionService);
  private dateHandler = inject(DatesHandlerService);

  visible = this.dialogService.createEventState();
  dateSelection = this.calendarInteractionService.getDateSelection();
  familyMembers: FamilyMember[] = familyMembers;

  formatedDate: Signal<string> = computed(() => {
    return this.dateHandler.formatedDate(
      this.dateSelection().startStr,
      this.dateSelection().endStr
    );
  });

  createEventForm = new FormGroup({
    allDay: new FormControl<boolean>(false),
    eventTitle: new FormControl<string | null>(null),
    familyMember: new FormControl<FamilyMember>({
      name: 'Toda a família',
      color: 'Aquamarine',
      textColor: 'DarkSlateGray',
    }),
  });

  allDay: Signal<boolean> = computed(() => {
    const moreThanOneDay: boolean = this.dateHandler.moreThanOneDay(
      this.dateSelection().startStr,
      this.dateSelection().endStr
    );
    if (!moreThanOneDay) return this.createEventForm.value.allDay ?? false;
    return true;
  });

  // familyMembers = [
  //   {
  //     name: 'Toda a família',
  //     color: 'Aquamarine',
  //     textColor: 'DarkSlateGray',
  //   },
  //   {
  //     name: 'Mãe',
  //     color: 'red',
  //   },
  //   {
  //     name: 'Pai',
  //     color: 'black',
  //   },
  //   {
  //     name: 'Filho',
  //     color: 'green',
  //   },
  //   {
  //     name: 'Filha',
  //     color: 'pink',
  //   },
  // ];

  createEvent() {
    this.dateSelection().jsEvent?.preventDefault();

    const calendarApi = this.dateSelection().view.calendar;

    calendarApi.addEvent({
      title: this.createEventForm.value.eventTitle ?? 'Evento sem título',
      start: this.dateSelection().start,
      end: this.dateSelection().end,
      allDay: this.allDay(),
      color: this.createEventForm.value.familyMember?.color ?? 'sky',
      textColor: this.createEventForm.value.familyMember?.textColor ?? 'white',
      familyMember:
        this.createEventForm.value.familyMember?.name ?? 'Não selecionado',
    });

    this.dialogService.closeCreateEvent();
    this.createEventForm.reset(this.createEventForm.value);
  }
}
