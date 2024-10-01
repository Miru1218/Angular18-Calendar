import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  CalendarModule as AngularCalendarModule,
  CalendarView
} from 'angular-calendar';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    CommonModule,
    AngularCalendarModule,
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {

  // 用於控制日曆顯示模式，這裡初始設定為 "Month"（月視圖）
  view: CalendarView = CalendarView.Month;
  // 套用CalendarView的設定
  CalendarView = CalendarView;
  // 設定日曆的當前日期，預設為今天
  viewDate: Date = new Date();

}
