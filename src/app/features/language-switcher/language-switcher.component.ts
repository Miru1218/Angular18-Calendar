
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import localeZhHant from '@angular/common/locales/zh-Hant';

import { Component } from '@angular/core';

import { CommonModule, registerLocaleData } from '@angular/common';
import {
  CalendarModule as AngularCalendarModule,
  CalendarView
} from 'angular-calendar';
import { ButtonModule } from 'primeng/button';

registerLocaleData(localeZhHant, 'zh-Hant');//繁體中文
registerLocaleData(localeFr);//法語
registerLocaleData(localeEn, 'en-US');//英文

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
export class LanguageSwitcherComponent {
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
  locale: string = 'zh-Hant';// 預設語言為繁體中文

  //切換語言
  toggleLanguage() {
    if (this.locale === 'zh-Hant') {
      this.locale = 'fr'; // 切換到法語
      registerLocaleData(localeFr, 'fr');
    } else if (this.locale === 'fr') {
      this.locale = 'en-US'; // 切換到英文
      registerLocaleData(localeEn, 'en-US');
    } else {
      this.locale = 'zh-Hant'; // 切換回繁體中文
      registerLocaleData(localeZhHant, 'zh-Hant');
    }
  }

}
