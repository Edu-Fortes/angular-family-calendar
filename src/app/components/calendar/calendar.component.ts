import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { CreateEventDialogStateService } from '../../services/create-event-dialog-state.service';
import { SelectionInfoService } from '../../services/selection-info.service';
import { EditEventDialogStateService } from '../../services/edit-event-dialog-state.service';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  constructor(
    private dataService: CreateEventDialogStateService,
    private selectionService: SelectionInfoService,
    private editStateService: EditEventDialogStateService
  ) { }

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
            allDay: false,
          },
          {
            title: 'Lançar App para publico alvo',
            date: '2024-12-27',
            allDay: false,
          },
        ],
        color: 'black', // an option!
        textColor: 'yellow', // an option!
      },
      {
        events: [
          {
            title: 'Evento Custom',
            date: '2024-12-27',
            allDay: false,
          },
          {
            title: 'Nova cor evento',
            date: '2024-12-27',
            allDay: false,
          },
        ],
        color: 'green', // an option!
        // textColor: 'yellow' // an option!
      },
      {
        events: [
          {
            title: 'Festa ano novo firma',
            date: '2024-12-28',
            allDay: false,
          },
          {
            title: 'Véspera Ano novo',
            date: '2024-12-31',
            allDay: false,
          },
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
          {
            title: 'Véspera Ano novo',
            date: '2024-12-31',
          },
        ],
      },
    ],
    displayEventTime: false,
    dayMaxEvents: true,
    selectable: true,
    selectMirror: true,
    select: this.handleDateSelect.bind(this), // arrumar metodo para grava no BD
    editable: true,
    eventClick: this.handleEventClick.bind(this),
  };

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo)
    this.dataService.setData(true);
    this.selectionService.setData(selectInfo);
  }

  handleEventClick(eventClickInfo: EventClickArg) {
    console.log(eventClickInfo.event.title);
    this.editStateService.setState(true);
  }
}
