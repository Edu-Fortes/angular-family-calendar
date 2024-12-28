import { Component } from '@angular/core';
import { CreateEventDialogStateService } from '../../services/create-event-dialog-state.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-dialog',
  imports: [DialogModule, ButtonModule],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.css',
})
export class CreateDialogComponent {
  visible;

  constructor(private dataService: CreateEventDialogStateService) {
    this.visible = this.dataService.getData();
  }
}
