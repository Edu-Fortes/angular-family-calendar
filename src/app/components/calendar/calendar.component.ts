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
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.interface';

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
        id: '1',
        url: 'https://localhost:7029/users/1/events',
        color: 'red',
        textColor: 'white',
      },
      {
        id: '2',
        url: 'https://localhost:7029/users/2/events',
        color: 'blue',
        textColor: 'white',
      },
      {
        id: '3',
        url: 'https://localhost:7029/users/3/events',
        color: 'orange',
        textColor: 'black',
      },
      {
        id: '4',
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
  }
}
