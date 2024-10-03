// event-crud-calendar.model.ts
import { CalendarEvent } from 'angular-calendar';

export interface ModalData {
    action: string;
    event: CalendarEvent;
    title: string;
    start: Date;
    end: Date;
}
