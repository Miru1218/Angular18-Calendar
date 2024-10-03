import { Routes } from '@angular/router';
import { BaseComponent } from './features/base/base.component';
import { DefaultCalendarComponent } from './features/default-calendar/default-calendar.component';
import { EventCRUDCalendarComponent } from './features/event-crud-calendar/event-crud-calendar.component';
import { LanguageSwitcherComponent } from './features/language-switcher/language-switcher.component';
import { ModifyMonthStyleComponent } from './features/modify-month-style/modify-month-style.component';
import { MonthNavigationComponent } from './features/month-navigation/month-navigation.component';
import { ViewModeSwitcherComponent } from './features/view-mode-switcher/view-mode-switcher.component';

export const routes: Routes = [
    { path: '', component: DefaultCalendarComponent },
    { path: 'ModifyMonthStyle', component: ModifyMonthStyleComponent },
    { path: 'Base', component: BaseComponent },
    { path: 'MonthNavigation', component: MonthNavigationComponent },
    { path: 'ViewModeSwitcher', component: ViewModeSwitcherComponent },
    { path: 'LanguageSwitcher', component: LanguageSwitcherComponent },
    { path: 'EventCRUDCalendar', component: EventCRUDCalendarComponent },
];
