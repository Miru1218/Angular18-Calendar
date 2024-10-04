import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  CalendarModule as AngularCalendarModule,
  CalendarView
} from 'angular-calendar';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-month-navigation',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    AngularCalendarModule,
  ],
  templateUrl: './month-navigation.component.html',
  styleUrl: './month-navigation.component.scss'
})
export class MonthNavigationComponent {


  // 用於控制日曆顯示模式，這裡初始設定為 "Month"（月視圖）
  view: CalendarView = CalendarView.Month;
  // 套用CalendarView的設定
  CalendarView = CalendarView;
  // 設定日曆的當前日期，預設為Today
  viewDate: Date = new Date();

}
