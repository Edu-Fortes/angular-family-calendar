import { Component, computed, inject, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogHandlerService } from '../../services/dialog-handler/dialog-handler.service';
import { CalendarInteractionService } from '../../services/calendar-interaction/calendar-interaction.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DatesHandlerService } from '../../services/dates-handler/dates-handler.service';
import { FamilyMember, familyMembers } from '../../models/family-members.data';

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
  private formBuilder = inject(FormBuilder);

  visible = this.dialogService.createEventState();
  dateSelection = this.calendarInteractionService.getDateSelection();
  familyMembers: FamilyMember[] = familyMembers;

  formatedDate: Signal<string> = computed(() => {
    return this.dateHandler.formatedDate(
      this.dateSelection().startStr,
      this.dateSelection().endStr
    );
  });

  createEventForm = this.formBuilder.nonNullable.group({
    allDay: true,
    eventTitle: '',
    familyMember: {
      name: 'Toda a família',
      color: 'sky',
      textColor: 'white',
    },
  });

  allDay: Signal<boolean> = computed(() => {
    const moreThanOneDay: boolean = this.dateHandler.moreThanOneDay(
      this.dateSelection().startStr,
      this.dateSelection().endStr
    );
    if (!moreThanOneDay) return this.createEventForm.value.allDay ?? false;
    return true;
  });

  createEvent() {
    this.dateSelection().jsEvent?.preventDefault();

    const calendarApi = this.dateSelection().view.calendar;
    const title = this.createEventForm.value.eventTitle
      ? this.createEventForm.value.eventTitle
      : 'Evento sem título';

    const familyMember = this.createEventForm.value.familyMember;
    if (!familyMember) {
      console.error('Family member not selected');
      return;
    }

    calendarApi.addEvent({
      title: title,
      start: this.dateSelection().startStr,
      end: this.dateSelection().endStr,
      allDay: this.allDay(),
      color: familyMember.color,
      textColor: familyMember.textColor,
      familyMember: familyMember.name,
    });

    this.dialogService.closeCreateEvent();
    this.createEventForm.reset();
  }
}
