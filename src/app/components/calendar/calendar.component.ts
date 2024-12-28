import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { CreateEventDialogStateService } from '../../services/create-event-dialog-state.service';
@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  visible;
  constructor(private dataService: CreateEventDialogStateService) {
    this.visible = this.dataService.getData();
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, listPlugin],
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
      year: 'Ano',
      list: 'Lista',
    },
    headerToolbar: {
      start: 'title',
      center: '',
      right: 'dayGridMonth,dayGridWeek,listDay prev today next',
    },
    views: {
      dayGridWeek: {
        titleFormat: {
          month: 'short',
          day: 'numeric',
        },
      },
    },
    eventSources: [
      {
        events: [
          {
            title: 'Terminar App',
            date: '2024-12-26',
          },
          { title: 'Lançar App para publico alvo', date: '2024-12-27' },
        ],
        color: 'black', // an option!
        textColor: 'yellow', // an option!
      },
      {
        events: [
          {
            title: 'Evento Custom',
            date: '2024-12-27',
          },
          { title: 'Nova cor evento', date: '2024-12-27' },
        ],
        color: 'green', // an option!
        // textColor: 'yellow' // an option!
      },
      {
        events: [
          {
            title: 'Festa ano novo firma',
            date: '2024-12-28',
          },
          { title: 'Véspera Ano novo', date: '2024-12-31' },
        ],
        color: 'orange', // an option!
        // textColor: 'yellow' // an option!
      },
      {
        events: [
          {
            title: 'Festa ano novo firma',
            date: '2024-12-27',
          },
          { title: 'Véspera Ano novo', date: '2024-12-31' },
        ],
      },
    ],
    displayEventTime: false,
    dayMaxEvents: true,
    selectable: true,
    selectMirror: true,
    select: this.openDialog, // arrumar metodo para grava no BD
  };

  // openDialog() {
  //   this.dataService.setData(true);
  // }

  openDialog() {
    this.dataService.setData(true);
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');
    this.dataService.setData(true);
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     // id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  }
}
