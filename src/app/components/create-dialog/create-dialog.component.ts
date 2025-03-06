import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogHandlerService } from '../../services/dialog-handler/dialog-handler.service';
import { CalendarInteractionService } from '../../services/calendar-interaction/calendar-interaction.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TabsModule } from 'primeng/tabs';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DatesHandlerService } from '../../services/dates-handler/dates-handler.service';
import { CreateEventForm } from '../../models/form-input.interface';
import { EventService } from '../../services/event/event.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.interface';
import { Event } from '../../models/event.interface';
import { MessageService } from 'primeng/api';
import {
  repeatEvery,
  selectTimePeriod,
  selectWeekDay,
} from '../../models/recurrent.interface';

@Component({
  selector: 'app-create-dialog',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToggleSwitchModule,
    Select,
    FloatLabelModule,
    TabsModule,
    SelectButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.css',
})
export class CreateDialogComponent implements OnInit {
  constructor(private messageService: MessageService) { }

  private dialogService = inject(DialogHandlerService);
  private calendarInteractionService = inject(CalendarInteractionService);
  private dateHandler = inject(DatesHandlerService);
  private formBuilder = inject(FormBuilder);
  private eventService = inject(EventService);
  private userService = inject(UserService);

  visible = this.dialogService.createEventState();
  dateSelection = this.calendarInteractionService.getDateSelection();
  familyMembers: User[] = [];

  weekDay = selectWeekDay;
  timePeriod = selectTimePeriod;
  repeatEvery = repeatEvery;

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

  formatedDate: Signal<string> = computed(() => {
    return this.dateHandler.formatedDate(
      this.dateSelection().startStr,
      this.dateSelection().endStr
    );
  });

  createEventForm: FormGroup =
    this.formBuilder.nonNullable.group<CreateEventForm>({
      allDay: true,
      eventTitle: '',
      familyMember: {
        userId: 0,
        name: 'Toda a família',
        color: 'sky',
        textColor: 'white',
      },
      weekDay: '',
      timePeriod: '',
      repeatEvery: '',
    });

  allDay: Signal<boolean> = computed(() => {
    const moreThanOneDay: boolean = this.dateHandler.moreThanOneDay(
      this.dateSelection().startStr,
      this.dateSelection().endStr
    );
    if (!moreThanOneDay) return this.createEventForm.value.allDay ?? false;
    return true;
  });

  getCurrentYear() {
    return new Date().getFullYear();
  }

  getSelectedWeekDay() {
    const weekDays = this.createEventForm.get('weekDay')?.value;

    if (!weekDays || weekDays.length === 0) return '';

    switch (weekDays.length) {
      case 1:
        if (weekDays[0] === 'Domingo' || weekDays[0] === 'Sábado')
          return `no ${weekDays[0]}`;
        return `na ${weekDays[0]}`;
      case 2:
        if (weekDays[0] === 'Domingo' || weekDays[0] === 'Sábado')
          return `no ${weekDays[0]} e ${weekDays[1]}`;
        return `na ${weekDays[0]} e ${weekDays[1]}`;
      default:
        const lastDay = weekDays[weekDays.length - 1];
        const selectedDays = weekDays
          .slice(0, -1)
          .map((day: string) => day)
          .join(', ');
        if (weekDays[0] === 'Domingo' || weekDays[0] === 'Sábado')
          return `no ${selectedDays} e ${lastDay}`;
        return `na ${selectedDays} e ${lastDay}`;
    }
  }

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

    console.log('Log do form: ', this.createEventForm.value);

    const event: Event = {
      title: title,
      start: new Date(this.dateSelection().start),
      end: new Date(this.dateSelection().end),
      allDay: this.allDay(),
      extendedProps: familyMember.name,
      userId: familyMember.userId,
    };

    this.eventService.createEvent(event).subscribe({
      next: (response) => {
        console.log('Event created', response);

        calendarApi.addEvent(
          {
            title: title,
            start: this.dateSelection().startStr,
            end: this.dateSelection().endStr,
            allDay: this.allDay(),
          },
          `${familyMember.userId}`
        );
        calendarApi.refetchEvents();

        // Service to control PrimeNG Toast
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Evento criado com sucesso',
        });

        this.dialogService.closeCreateEvent();
        this.createEventForm.reset();
      },
      error: (error) => {
        // Service to control PrimeNG Toast
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar evento',
        });
        console.error('Error creating event', error);
      },
    });
  }

  closeDialog() {
    this.visible.set(false);
    this.createEventForm.reset();
  }
}
