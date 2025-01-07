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
export class EditDialogComponent {
  private stateService = inject(EditEventDialogStateService);
  private selectionService = inject(SelectionInfoService);
  visible = this.stateService.getState();
  data = this.selectionService.getEventClick();

  editEventForm = new FormGroup({
    allDay: new FormControl<boolean | null>(null),
    title: new FormControl<string>(''),
    familyMember: new FormControl<string>(''),
    startDate: new FormControl<string>(''),
    endDate: new FormControl<string>(''),
  });

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
      color: 'yellow',
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

    if (this.editEventForm.value.title !== '')
      this.data().event.setProp('title', this.editEventForm.value.title);

    // if (this.editEventForm.value.familyMember !== '')
    //   this.data().event.extendedProps.setExtendedProp(
    //     'familyMember',
    //     this.editEventForm.value.familyMember
    //   );

    if (this.editEventForm.value.startDate !== '')
      this.data().event.setStart(this.editEventForm.value.startDate);

    if (this.editEventForm.value.endDate !== '')
      this.data().event.setEnd(this.editEventForm.value.endDate);

    this.data().event.setAllDay(this.editEventForm.value.allDay);

    this.visible.set(false);
    this.editEventForm.reset();
  }
}
