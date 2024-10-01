import { Routes } from '@angular/router';
import { DefaultCalendarComponent } from './features/default-calendar/default-calendar.component';
import { ModifyMonthStyleComponent } from './features/modify-month-style/modify-month-style.component';
import { BaseComponent } from './features/base/base.component';
import { MonthNavigationComponent } from './features/month-navigation/month-navigation.component';

export const routes: Routes = [
    { path: '', component: DefaultCalendarComponent },
    { path: 'ModifyMonthStyle', component: ModifyMonthStyleComponent },
    { path: 'Base', component: BaseComponent },
    { path: 'MonthNavigation', component: MonthNavigationComponent },
];
