import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [
    CalendarComponent,
    CardModule,
    ToastModule,
    CreateDialogComponent,
    EditDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
