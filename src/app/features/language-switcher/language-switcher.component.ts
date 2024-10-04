

import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  CalendarModule as AngularCalendarModule,
  CalendarView
} from 'angular-calendar';
import { ButtonModule } from 'primeng/button';
import { SharedCalendarEventService } from '../../shared/service/shared-calendar-event.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    AngularCalendarModule,
  ], templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent implements OnInit {
  // 用於控制日曆顯示模式，這裡初始設定為 "Month"（月視圖）
  view: CalendarView = CalendarView.Month;
  // 套用CalendarView的設定
  CalendarView = CalendarView;
  // 設定日曆的當前日期，預設為Today
  viewDate: Date = new Date();
  // 切換日曆視圖到月、週、日
  setView(view: CalendarView) {
    this.view = view;
  }
  locale: string = 'zh-Hant';// 預設語言為繁體中文

  constructor(private sharedCalendarEventService: SharedCalendarEventService) { }

  ngOnInit() {
    this.onLocaleChange();
  }

  onLocaleChange() {
    this.sharedCalendarEventService.sessionItem$.subscribe(item => {
      this.locale = item;
    });
  }

}
