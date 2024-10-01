import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class ModifyMonthStyleService {
  private jsonUrl = 'assets/mock/json-file/modify-month-style.json';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(this.jsonUrl).pipe(
      map(events => events.map(event => ({
        ...event,
        start: new Date(event.start),
        end: event.end ? new Date(event.end) : undefined,
      })))
    );
  }
}