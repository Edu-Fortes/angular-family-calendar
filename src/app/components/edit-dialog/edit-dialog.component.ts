import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { EditEventDialogStateService } from '../../services/edit-event-dialog-state.service';
import { SelectionInfoService } from '../../services/selection-info.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    ReactiveFormsModule,
    DialogModule,
    CheckboxModule,
    SelectModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
})
export class EditDialogComponent {
  private stateService = inject(EditEventDialogStateService)
  private selectionService = inject(SelectionInfoService)
  visible = this.stateService.getState()
  data = this.selectionService.getEventClick()

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
      textColor: 'DarkSlateGray'
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
    console.log(this.data(), this.data().title, this.data().familyMember, this.data().allDay)
    console.log('Log do Form antes do method: ', this.editEventForm.value)

    this.editEventForm.patchValue({
      ...this.data()
    })
    console.log('Depois do method: ', this.editEventForm.value)

    this.editEventForm.patchValue({
      title: this.editEventForm.value.title
    })

    console.log('depois de updatar: ', this.editEventForm.value)

    this.data().jsEvent?.preventDefault();

    const event = this.data();


    this.editEventForm.reset()

  }

}
