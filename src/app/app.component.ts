import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CardModule } from 'primeng/card';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';

@Component({
  selector: 'app-root',
  imports: [CalendarComponent, CardModule, CreateDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
