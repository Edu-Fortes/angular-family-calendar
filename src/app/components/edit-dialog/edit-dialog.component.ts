import { Component, computed, effect, inject, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogHandlerService } from '../../services/dialog-handler/dialog-handler.service';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { CalendarInteractionService } from '../../services/calendar-interaction/calendar-interaction.service';
import { FamilyMember, familyMembers } from '../../models/family-members.data';
import { FormatDateOptions } from '@fullcalendar/core/index.js';
import { formatDate } from '@fullcalendar/core';
import { EditEventForm } from '../../models/form-input.interface';
import { DatesHandlerService } from '../../services/dates-handler/dates-handler.service';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    ToggleSwitchModule,
    DatePickerModule,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
})
export class EditDialogComponent {
  private dialogService = inject(DialogHandlerService);
  private calendarInteractionService = inject(CalendarInteractionService);
  private formBuilder = inject(FormBuilder);
  private dateHandler = inject(DatesHandlerService);

  visible = this.dialogService.editEventState();
  eventData = this.calendarInteractionService.getEventClick();
  familyMembers: FamilyMember[] = familyMembers;

  placeholders = computed(() => {
    const data = this.eventData().event;

    if (data) {
      const formaterOptions: FormatDateOptions = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        locale: 'pt-BR',
      };
      const startDate = formatDate(data.startStr, formaterOptions);
      const endDate = this.dateHandler.excludeOneDayToEnd(data.endStr);
      return {
        allDay: data.allDay,
        eventTitle: data.title,
        startDateStr: startDate,
        endDateStr: endDate,
        familyMember: data.extendedProps['familyMember'],
      };
    }
    return;
  });

  editEventForm: FormGroup = this.formBuilder.nonNullable.group<EditEventForm>({
    allDay: true,
    eventTitle: '',
    familyMember: {
      name: '',
      color: 'sky',
      textColor: 'white',
    },
    startDate: '',
    endDate: '',
  });

  editEvent() {
    console.log(this.editEventForm.value);

    if (this.editEventForm.value.eventTitle === '')
      this.editEventForm.patchValue({
        eventTitle: this.eventData().event.title,
      });

    if (this.editEventForm.value.familyMember.name === '')
      this.editEventForm.patchValue({
        familyMember: this.eventData().event.extendedProps['familyMember'],
      });

    if (this.editEventForm.value.startDate === '')
      this.editEventForm.patchValue({
        startDate: this.eventData().event.start,
      });

    if (this.editEventForm.value.endDate === '')
      this.editEventForm.patchValue({
        endDate: this.eventData().event.end,
      });

    console.log('depois do patch', this.editEventForm.value);

    // change infos on calendar
    this.eventData().event.setProp(
      'title',
      this.editEventForm.value.eventTitle
    );
    this.eventData().event.setExtendedProp(
      'familyMember',
      this.editEventForm.value.familyMember?.name
    );
    this.eventData().event.setProp(
      'borderColor',
      this.editEventForm.value.familyMember?.color
    );
    this.eventData().event.setProp(
      'backgroundColor',
      this.editEventForm.value.familyMember?.color
    );
    this.eventData().event.setProp(
      'textColor',
      this.editEventForm.value.familyMember?.textColor
    );
    this.eventData().event.setDates(
      this.editEventForm.value.startDate,
      this.dateHandler.addOneDayToEndDate(this.editEventForm.value.endDate),
      { allDay: this.editEventForm.value.allDay } //quando muitos dias dá para settar allDay para false, quando selecionado somente o allday, plota dois dias
    );

    console.log(this.eventData());

    this.visible.set(false);
    this.editEventForm.reset();
  }
}
