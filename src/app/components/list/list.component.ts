import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-list',
  imports: [FullCalendarModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  calendarOptions: CalendarOptions = {
    plugins: [listPlugin],
    initialView: 'listDay',
    listDaySideFormat: false,
    locale: 'pt-br',
    headerToolbar: false,
    height: '100%',
    events: [
      {
        title: 'event 1',
        date: '2024-12-23',
      },
      { title: 'event 2', date: '2024-12-23' },
    ],
    noEventsContent: 'Nenhum evento programado',
    displayEventTime: false,
  };
}
