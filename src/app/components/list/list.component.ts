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
    height: 'auto',
    events: [
      {
        title: 'Terminar App',
        date: '2024-12-26',
      },
      { title: 'Lançar App para publico alvo', date: '2024-12-26' },
    ],
    noEventsContent: 'Nenhum evento programado',
    displayEventTime: false,
  };
}
