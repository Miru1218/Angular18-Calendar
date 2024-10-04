import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
// 共用語系Service
@Injectable({
  providedIn: 'root',
})
export class SharedCalendarEventService {
  private sessionItemSubject = new Subject<string>()
  sessionItem$ = this.sessionItemSubject.asObservable()
  constructor() { }
  setSessionItem(title: string, content: any): void {
    const contentJson = JSON.stringify(content)
    sessionStorage.setItem(title, contentJson)
    this.sessionItemSubject.next(content)
  }
}