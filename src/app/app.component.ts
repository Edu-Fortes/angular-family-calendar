import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ListComponent } from './components/list/list.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalendarComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
