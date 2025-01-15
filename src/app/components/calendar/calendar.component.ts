import { Component, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { DialogHandlerService } from '../../services/dialog-handler.service';
import { SelectionInfoService } from '../../services/selection-info.service';
import { CalendarInteractionService } from '../../services/calendar-interaction.service';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  private dialogService = inject(DialogHandlerService);
  private calendarInteractionService = inject(CalendarInteractionService);

  constructor(private selectionService: SelectionInfoService) {}

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
    select: this.handleDateSelect.bind(this),
    editable: true,
    eventClick: this.handleEventClick.bind(this),
  };

  // function receives as param the selected clicked dates (selectInfo)
  handleDateSelect(selectInfo: DateSelectArg) {
    this.dialogService.openCreateEvent();
    this.calendarInteractionService.setDateSelection(selectInfo);
    this.selectionService.setData(selectInfo);
  }

  // receive as param the clicked event (eventClickInfo)
  handleEventClick(eventClickInfo: EventClickArg) {
    this.dialogService.openEditEvent();
    this.selectionService.setEventClick(eventClickInfo);
    console.log('Log do eventClick: ', eventClickInfo.event);

    this.selectionService.setEventData({
      title: eventClickInfo.event.title,
      allDay: eventClickInfo.event.allDay,
      startStr: eventClickInfo.event.startStr,
      endStr: eventClickInfo.event.endStr,
      ...eventClickInfo.event.extendedProps,
    });
  }
}
