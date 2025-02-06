import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Event } from '../../models/event.interface';
import { EditEventForm } from '../../models/form-input.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `${environment.apiBASE_URL}/events`;

  constructor(private http: HttpClient) {}

  createEvent(event: Event): Observable<any> {
    return this.http.post(this.apiUrl, event);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  updateEvent(eventId: number, event: Partial<EditEventForm>): Observable<any> {
    //precisa verificar o header está enviando como plain/text
    return this.http.patch(`${this.apiUrl}/${eventId}`, event);
  }
}
// alterar o método updateEvent para receber e alterar somente os campos que foram alterados
