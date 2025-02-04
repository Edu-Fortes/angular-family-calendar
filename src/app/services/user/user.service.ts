import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiBASE_URL}/users`;

  constructor(private http: HttpClient) {}

  getUSers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
