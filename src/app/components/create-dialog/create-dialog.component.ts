import { Component, computed, Signal } from '@angular/core';
import { CreateEventDialogStateService } from '../../services/create-event-dialog-state.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SelectionInfoService } from '../../services/selection-info.service';

@Component({
  selector: 'app-create-dialog',
  imports: [DialogModule, ButtonModule],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.css',
})
export class CreateDialogComponent {
  visible;
  selection;

  constructor(
    private dataService: CreateEventDialogStateService,
    private selectionService: SelectionInfoService
  ) {
    this.visible = this.dataService.getData();
    this.selection = this.selectionService.getData();
  }

  formatedDate: Signal<any> = computed(() => {
    return this.selection().start.toISOString().split('T')[0];
  });
}
