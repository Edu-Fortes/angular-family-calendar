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
import { MessageService } from 'primeng/api';

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
  constructor(private messageService: MessageService) {}

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
      return {
        allDay: data.allDay,
        eventTitle: data.title,
        startDateStr: startDate,
        endDateStr: endDate,
        user: data.extendedProps['user'],
      };
    }
    return;
  });

  editEventForm: FormGroup = this.formBuilder.group<EditEventForm>({
    start: null,
    end: null,
    allDay: null,
    title: null,
    userId: null,
  });

  getChangedValues(initialValues: EditEventForm, currentValues: EditEventForm) {
    const changedValues: Partial<EditEventForm> = {};
    for (const key in currentValues) {
      if (
        currentValues[key] !== initialValues[key] &&
        currentValues[key] !== null
      ) {
        if (key === 'end') {
          const endDate = currentValues[key];
          endDate.setDate(endDate.getDate() + 1);
          changedValues[key] = endDate;
        } else {
          changedValues[key] = currentValues[key];
        }
        changedValues[key] = currentValues[key];
      }
    }
    return changedValues;
  }

  editEvent() {
    const formValues = this.editEventForm.value;
    const initialFormValues = {
      start: this.eventData().event.start,
      end: this.eventData().event.end,
      allDay: this.eventData().event.allDay,
      title: this.eventData().event.title,
      userId: this.eventData().event.extendedProps['user'],
    };

    const changedValues = this.getChangedValues(initialFormValues, formValues);

    if (Object.keys(changedValues).length > 0) {
      const eventId = this.eventData().event.extendedProps['eventId'];
      this.eventService.updateEvent(eventId, changedValues).subscribe({
        next: (response) => {
          // Service to control PrimeNG Toast
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Evento atualizado com sucesso',
          });

          this.dialogService.closeEditEvent();
          this.editEventForm.reset();
          this.eventData().view.calendar.refetchEvents();
        },
        error: (error) => {
          // Service to control PrimeNG Toast
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar evento',
          });
          console.error('Error updating event', error);
        },
      });
    } else {
      this.dialogService.closeEditEvent();
      this.editEventForm.reset();
    }
  }

  deleteEvent() {
    const eventId = this.eventData().event.extendedProps['eventId'];
    this.eventService.deleteEvent(eventId).subscribe({
      next: (response) => {
        // Service to control PrimeNG Toast
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Evento deletado com sucesso',
        });
        this.dialogService.closeEditEvent();
        this.editEventForm.reset();
        this.eventData().view.calendar.refetchEvents();
      },
      error: (error) => {
        // Service to control PrimeNG Toast
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao deletar evento',
        });
        console.error('Error deleting event', error);
      },
    });
  }

  closeDialog() {
    this.visible.set(false);
    this.editEventForm.reset();
  }
}
