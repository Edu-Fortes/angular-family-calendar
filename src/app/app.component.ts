import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CardModule } from 'primeng/card'

@Component({
  selector: 'app-root',
  imports: [CalendarComponent, CardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent { }
