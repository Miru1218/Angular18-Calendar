import { Routes } from '@angular/router';
import { DefaultCalendarComponent } from './features/default-calendar/default-calendar.component';
import { ModifyMonthStyleComponent } from './features/modify-month-style/modify-month-style.component';

export const routes: Routes = [
    { path: '', component: DefaultCalendarComponent },
    { path: 'ModifyMonthStyle', component: ModifyMonthStyleComponent }
];
