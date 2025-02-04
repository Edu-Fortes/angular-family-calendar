import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Event } from '../../models/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `${environment.apiBASE_URL}/events`;

  constructor(private http: HttpClient) {}

  createEvent(event: Event): Observable<any> {
    return this.http.post(this.apiUrl, event);
  }
}
