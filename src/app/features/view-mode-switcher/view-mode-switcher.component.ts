import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  CalendarModule as AngularCalendarModule,
  CalendarView
} from 'angular-calendar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-view-mode-switcher',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    AngularCalendarModule,
  ],
  templateUrl: './view-mode-switcher.component.html',
  styleUrl: './view-mode-switcher.component.scss'
})
export class ViewModeSwitcherComponent {
  // 用於控制日曆顯示模式，這裡初始設定為 "Month"（月視圖）
  view: CalendarView = CalendarView.Month;
  // 套用CalendarView的設定
  CalendarView = CalendarView;
  // 設定日曆的當前日期，預設為今天
  viewDate: Date = new Date();
  // 切換日曆視圖到月、週、日
  setView(view: CalendarView) {
    this.view = view;
  }

}
