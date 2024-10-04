import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import localeZhHant from '@angular/common/locales/zh-Hant';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SharedCalendarEventService } from './shared/service/shared-calendar-event.service';

registerLocaleData(localeZhHant, 'zh-Hant');//繁體中文
registerLocaleData(localeFr);//法語
registerLocaleData(localeEn, 'en-US');//英文

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenubarModule,
    ButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  items: MenuItem[] | undefined;
  locale: string = 'zh-Hant';
  constructor(
    private router: Router,
    private sharedCalendarEventService: SharedCalendarEventService
  ) { }
  ngOnInit() {
    this.items = [
      {
        label: '預設',
        command: () => (this.router.navigate(['']))
      },
      {
        label: '修改月份樣式',
        command: () => (this.router.navigate(['ModifyMonthStyle']))
      },
      {
        label: '行事曆',
        items: [
          {
            label: '基礎行事曆畫面',
            command: () => (this.router.navigate(['Base']))
          },
          {
            label: '切換月份',
            command: () => (this.router.navigate(['MonthNavigation']))
          },
          {
            label: '切換視圖模式',
            command: () => (this.router.navigate(['ViewModeSwitcher']))
          },
          {
            label: '切換語言',
            command: () => (this.router.navigate(['LanguageSwitcher']))
          },
          {
            label: '行事曆CRUD',
            command: () => (this.router.navigate(['EventCRUDCalendar']))
          },
          {
            label: '排除周末',
            command: () => (this.router.navigate(['ExcludeWeekends']))
          },
          {
            label: '可拖曳的外部事件',
            command: () => (this.router.navigate(['DraggableExternalEvents']))
          },
        ]
      },
    ]
  }

  //切換語言
  toggleLanguage() {
    if (this.locale === 'zh-Hant') {
      this.locale = 'fr'; // 切換到法語
      registerLocaleData(localeFr); // 重新註冊法語
    } else if (this.locale === 'fr') {
      this.locale = 'en-US'; // 切換到英文
      registerLocaleData(localeEn, 'en-US'); // 重新註冊英文
    } else {
      this.locale = 'zh-Hant'; // 切換回繁體中文
      registerLocaleData(localeZhHant, 'zh-Hant'); // 重新註冊繁體中文
    }
    this.sharedCalendarEventService.setSessionItem('locale', this.locale); // 更新共享語言狀態
  }

}