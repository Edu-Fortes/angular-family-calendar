import { Component, computed, inject, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogHandlerService } from '../../services/dialog-handler/dialog-handler.service';
import { CalendarInteractionService } from '../../services/calendar-interaction/calendar-interaction.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DatesHandlerService } from '../../services/dates-handler/dates-handler.service';
import { CreateEventForm } from '../../models/form-input.interface';
import { EventService } from '../../services/event/event.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.interface';

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
  private eventService = inject(EventService);
  private userService = inject(UserService);

  visible = this.dialogService.createEventState();
  dateSelection = this.calendarInteractionService.getDateSelection();
  familyMembers: User[] = [];

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
        id: 0,
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
    console.log('Log do familyMember: ', familyMember);
    if (!familyMember) {
      console.error('Family member not selected');
      return;
    }

    const event = {
      title: title,
      start: new Date(this.dateSelection().start),
      end: new Date(this.dateSelection().end),
      allDay: this.allDay(),
      userId: familyMember.userId,
    };
    console.log('Log do event: ', event);

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

        this.dialogService.closeCreateEvent();
        this.createEventForm.reset();
      },
      error: (error) => {
        console.error('Error creating event', error);
      },
    });
  }

  closeDialog() {
    this.visible.set(false);
    this.createEventForm.reset();
  }
}
