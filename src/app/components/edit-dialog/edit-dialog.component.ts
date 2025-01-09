import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { EditEventDialogStateService } from '../../services/edit-event-dialog-state.service';
import { SelectionInfoService } from '../../services/selection-info.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface FamilyMember {
  name: string;
  color: string;
  textColor: string;
}

@Component({
  selector: 'app-edit-dialog',
  imports: [
    ReactiveFormsModule,
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
  private stateService = inject(EditEventDialogStateService);
  private selectionService = inject(SelectionInfoService);
  visible = this.stateService.getState();
  data = this.selectionService.getEventClick();
  editEventForm: FormGroup | undefined | any;

  ngOnInit(): void {
    this.editEventForm = new FormGroup({
      allDay: new FormControl<boolean>(false),
      title: new FormControl<string>(''),
      familyMember: new FormControl<FamilyMember | null>(null),
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
    });
  }

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

  editEvent() {
    console.log(this.data());
    console.log(this.data().event.extendedProps);
    console.log(this.editEventForm.value);

    if (this.editEventForm.value.title !== '')
      this.data().event.setProp('title', this.editEventForm.value.title);

    if (this.editEventForm.value.familyMember?.name !== '') {
      this.data().event.setExtendedProp(
        'familyMember',
        this.editEventForm.value.familyMember?.name
      );
      this.data().event.setExtendedProp(
        'color',
        this.editEventForm.value.familyMember?.color
      );
      this.data().event.setProp(
        'backgroundColor',
        this.editEventForm.value.familyMember?.color
      );
      this.data().event.setProp(
        'borderColor',
        this.editEventForm.value.familyMember?.color
      );
    }

    if (
      this.editEventForm.value.startDate !== null ||
      this.editEventForm.value.endDate !== null
    ) {
      const correctEndDay = this.editEventForm.value.endDate?.setDate(
        this.editEventForm.value.endDate?.getDate() + 1
      );

      this.data().event.setDates(
        this.editEventForm.value.startDate,
        correctEndDay,
        { allDay: this.editEventForm.value.allDay }
      );
    }

    this.visible.set(false);
    this.editEventForm.reset();
  }
}
