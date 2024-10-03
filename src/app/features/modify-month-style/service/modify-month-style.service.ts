import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import {
  addDays,
  addHours,
  endOfMonth,
  startOfDay,
  subDays
} from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        start: event.title === 'A 3 day event' ? subDays(startOfDay(new Date()), 1) :
          event.title === 'A long event that spans 2 months' ? subDays(endOfMonth(new Date()), 3) :
            event.title === 'A draggable and resizable event' ? addHours(startOfDay(new Date()), 2) :
              startOfDay(new Date()),
        end: event.title === 'A 3 day event' ? addDays(new Date(), 1) :
          event.title === 'A long event that spans 2 months' ? addDays(endOfMonth(new Date()), 3) :
            event.title === 'A draggable and resizable event' ? addHours(new Date(), 2) :
              undefined
      })))
    );
  }
}

// 吃JSON

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { CalendarEvent } from 'angular-calendar';

// @Injectable({
//   providedIn: 'root'
// })
// export class ModifyMonthStyleService {
//   private jsonUrl = 'assets/mock/json-file/modify-month-style.json';

//   constructor(private http: HttpClient) { }

//   getEvents(): Observable<CalendarEvent[]> {
//     return this.http.get<CalendarEvent[]>(this.jsonUrl).pipe(
//       map(events => events.map(event => ({
//         ...event,
//         start: new Date(event.start),
//         end: event.end ? new Date(event.end) : undefined,
//       })))
//     );
//   }
// }