import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { EditEventDialogStateService } from '../../services/edit-event-dialog-state.service';

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

  constructor(private editStateService: EditEventDialogStateService) {
    this.visible = this.editStateService.getState();
  }

  familyMembers: any[] = [
    {
      name: 'John Doe',
      age: 30,
    },
  ];
}
