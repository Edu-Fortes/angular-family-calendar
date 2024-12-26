import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ListComponent } from './components/list/list.component';
import { CardModule } from 'primeng/card'

@Component({
  selector: 'app-root',
  imports: [CalendarComponent, ListComponent, CardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent { }
