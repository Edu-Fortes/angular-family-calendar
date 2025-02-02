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
import { DialogHandlerService } from '../../services/dialog-handler/dialog-handler.service';
import { CalendarInteractionService } from '../../services/calendar-interaction/calendar-interaction.service';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  private dialogService = inject(DialogHandlerService);
  private calendarInteractionService = inject(CalendarInteractionService);

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
        url: 'https://localhost:7029/users/1/events',
        color: 'red',
        textColor: 'white',
      },
      {
        url: 'https://localhost:7029/users/2/events',
        color: 'blue',
        textColor: 'white',
      },
      {
        url: 'https://localhost:7029/users/3/events',
        color: 'orange',
        textColor: 'black',
      },
      {
        url: 'https://localhost:7029/users/4/events',
        color: 'sky',
        textColor: 'white',
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
  }

  // receive as param the clicked event (eventClickInfo)
  handleEventClick(eventClickInfo: EventClickArg) {
    this.calendarInteractionService.setEventClick(eventClickInfo);
    this.dialogService.openEditEvent();

    // this.selectionService.setEventClick(eventClickInfo);
    console.log('Log do eventClick: ', eventClickInfo.event);

    // this.selectionService.setEventData({
    //   title: eventClickInfo.event.title,
    //   allDay: eventClickInfo.event.allDay,
    //   startStr: eventClickInfo.event.startStr,
    //   endStr: eventClickInfo.event.endStr,
    //   ...eventClickInfo.event.extendedProps,
    // });
  }
}
