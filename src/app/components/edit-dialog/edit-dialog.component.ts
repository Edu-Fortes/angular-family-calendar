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
import { EventClickArg, FormatDateOptions } from '@fullcalendar/core/index.js';
import { formatDate } from '@fullcalendar/core'
import { CreateEventForm, EditEventForm } from '../../models/form-input.interface';

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

  visible = this.dialogService.editEventState();
  eventData = this.calendarInteractionService.getEventClick();
  familyMembers: FamilyMember[] = familyMembers;

  placeholders = computed(() => {
    const data = this.eventData().event

    if (data) {
      const formaterOptions: FormatDateOptions = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        locale: 'pt-BR',
      }
      const startDate = formatDate(data.startStr, formaterOptions)
      const endDate = formatDate(data.endStr, formaterOptions) //arrumar aqui para subtrair um dia
      return {
        allDay: data.allDay,
        eventTitle: data.title,
        startDateStr: startDate,
        endDateStr: endDate,
        familyMember: data.extendedProps['familyMember'],
      }
    }
    return
  })

  editEventForm: FormGroup = this.formBuilder.nonNullable.group<EditEventForm>({
    allDay: true,
    eventTitle: '',
    familyMember: {
      name: '',
      color: 'sky',
      textColor: 'white',
    },
    startDateStr: '',
    endDateStr: '',
  });



  // editEventForm: FormGroup = new FormGroup({
  //   allDay: new FormControl<boolean>(true),
  //   title: new FormControl<string>(''),
  //   familyMember: new FormControl<FamilyMember | null>(null),
  //   startDate: new FormControl<Date | null>(null),
  //   endDate: new FormControl<Date | null>(null),
  // });

  // startDate = () => formatDate(this.eventData().startStr);
  // endDate = () => formatDate(this.eventData().endStr);
  // familyMember = () => this.eventData().familyMember;
  // title = () => this.eventData().title;

  editEvent() {
    console.log(this.editEventForm.value);

    if (this.editEventForm.value.eventTitle === '')
      this.editEventForm.patchValue({ eventTitle: this.eventData().event.title })

    if (this.editEventForm.value.familyMember.name === '')
      this.editEventForm.patchValue({ familyMember: this.eventData().event.extendedProps['familyMember'] })

    if (this.editEventForm.value.startDateStr === '')
      this.editEventForm.patchValue({ startDateStr: this.eventData().event.startStr })

    if (this.editEventForm.value.endDateStr === '')
      this.editEventForm.patchValue({ endDateStr: this.eventData().event.endStr })

    console.log('depois do patch', this.editEventForm.value);

    // change infos on calendar
    this.eventData().event.setProp('title', this.editEventForm.value.eventTitle)
    this.eventData().event.setExtendedProp('familyMember', this.editEventForm.value.familyMember?.name)
    this.eventData().event.setProp('borderColor', this.editEventForm.value.familyMember?.color)
    this.eventData().event.setProp('backgroundColor', this.editEventForm.value.familyMember?.color)
    this.eventData().event.setProp('textColor', this.editEventForm.value.familyMember?.textColor)
    this.eventData().event.setDates(this.editEventForm.value.startDateStr, this.editEventForm.value.endDateStr, { allDay: this.editEventForm.value.allDay })




    console.log(this.eventData())

    // if (
    //   this.editEventForm.value.title === '' ||
    //   this.editEventForm.value.title === null
    // ) {
    //   this.data().event.setProp('title', this.title());
    // } else this.data().event.setProp('title', this.editEventForm.value.title);

    // if (this.editEventForm.value.familyMember?.name !== '') {
    //   this.data().event.setExtendedProp(
    //     'familyMember',
    //     this.editEventForm.value.familyMember?.name
    //   );
    //   this.data().event.setExtendedProp(
    //     'color',
    //     this.editEventForm.value.familyMember?.color
    //   );
    //   this.data().event.setProp(
    //     'backgroundColor',
    //     this.editEventForm.value.familyMember?.color
    //   );
    //   this.data().event.setProp(
    //     'borderColor',
    //     this.editEventForm.value.familyMember?.color
    //   );
    // }

    // if (
    //   this.editEventForm.value.startDate !== null ||
    //   this.editEventForm.value.endDate !== null
    // ) {
    //   const correctEndDay = this.editEventForm.value.endDate?.setDate(
    //     this.editEventForm.value.endDate?.getDate() + 1
    //   );

    //   this.data().event.setDates(
    //     this.editEventForm.value.startDate,
    //     correctEndDay,
    //     { allDay: this.editEventForm.value.allDay }
    //   );
    // }

    this.visible.set(false);
    this.editEventForm.reset();
  }
}
