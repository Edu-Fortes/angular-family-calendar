import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { EditEventDialogStateService } from '../../services/edit-event-dialog-state.service';
import { SelectionInfoService } from '../../services/selection-info.service';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    DialogModule,
    CheckboxModule,
    FloatLabelModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
})
export class EditDialogComponent {
  visible;
  eventClickInfo;

  constructor(
    private editStateService: EditEventDialogStateService,
    private eventClickService: SelectionInfoService
  ) {
    this.visible = this.editStateService.getState();
    this.eventClickInfo = this.eventClickService.getEventClick()
  }

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
    console.log('Log do edit event: ', this.eventClickInfo())
  }

}
