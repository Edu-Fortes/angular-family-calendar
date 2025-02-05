import { Component, computed, effect, inject, OnInit } from '@angular/core';
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
import { FormatDateOptions } from '@fullcalendar/core/index.js';
import { formatDate } from '@fullcalendar/core';
import { EditEventForm } from '../../models/form-input.interface';
import { DatesHandlerService } from '../../services/dates-handler/dates-handler.service';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user/user.service';
import { EventService } from '../../services/event/event.service';

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
export class EditDialogComponent implements OnInit {
  private dialogService = inject(DialogHandlerService);
  private calendarInteractionService = inject(CalendarInteractionService);
  private formBuilder = inject(FormBuilder);
  private dateHandler = inject(DatesHandlerService);
  private userService = inject(UserService);
  private eventService = inject(EventService);

  visible = this.dialogService.editEventState();
  eventData = this.calendarInteractionService.getEventClick();
  familyMembers: User[] = [];
  eventsData: Event[] = [];

  ngOnInit() {
    this.loadFamilyMembers();
  }

  loadFamilyMembers() {
    this.userService.getUSers().subscribe({
      next: (users) => {
        this.familyMembers = users;
      },
      error: (error) => {
        console.error('Error loading family members', error);
      },
    });
  }

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
      const familyMember = this.familyMembers.find(
        (member) => member.name === 'Família'
      );
      return {
        allDay: data.allDay,
        eventTitle: data.title,
        startDateStr: startDate,
        endDateStr: endDate,
        user: familyMember,
      };
    }
    return;
  });

  editEventForm: FormGroup = this.formBuilder.group<EditEventForm>({
    start: null,
    end: null,
    allDay: true,
    title: null,
    userId: null,
  });

  editEvent() {
    console.log('chamada da funçao editEvent: ', this.editEventForm.value);

    this.editEventForm.patchValue({
      allDay: this.eventData().event.allDay,
      title: this.eventData().event.title,
      start: this.eventData().event.start,
      end: this.eventData().event.end,
      userId: 5,
    });

    const initialFormValues = { ...this.editEventForm.value };

    function getChangedValues(initialValues: any, currentValues: any): any {
      const changedValues: any = {};
      for (const key in currentValues) {
        if (currentValues[key] !== initialValues[key]) {
          changedValues[key];
        }
      }
      return changedValues;
    }

    console.log('depois do patch', this.editEventForm.value);
    console.log('initial values', initialFormValues);
    const calendarApi = this.eventData().view.calendar;

    if (this.editEventForm.valid) {
      const eventId = this.eventData().event.extendedProps['eventId'];
      this.eventService
        .updateEvent(
          eventId,
          getChangedValues(initialFormValues, this.editEventForm.value)
        )
        .subscribe({
          next: (response) => {
            console.log('Event updated', response);
            this.dialogService.closeEditEvent();
            this.editEventForm.reset();
            calendarApi.refetchEvents();
          },
          error: (error) => {
            console.error('Error updating event', error);
          },
        });
    }
  }

  removeEvent() {
    this.eventData().event.remove();
    this.visible.set(false);
  }

  closeDialog() {
    this.visible.set(false);
    this.editEventForm.reset();
  }
}
