import { CommonModule, registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import localeZhHant from '@angular/common/locales/zh-Hant';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CalendarModule as AngularCalendarModule,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {
  endOfDay,
  isSameDay,
  isSameMonth,
  startOfDay
} from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Subject } from 'rxjs';
import { ModalData } from '../../shared/models/shared-calendar-event.model';

registerLocaleData(localeZhHant, 'zh-Hant');//繁體中文
registerLocaleData(localeFr);//法語
registerLocaleData(localeEn, 'en-US');//英文

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-exclude-weekends',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    TableModule,
    FormsModule,
    InputTextModule,
    AngularCalendarModule,
    PrimeNgCalendarModule
  ],
  templateUrl: './exclude-weekends.component.html',
  styleUrl: './exclude-weekends.component.scss'
})
export class ExcludeWeekendsComponent {

  // 用於控制日曆顯示模式，這裡初始設定為 "Month"（月視圖）
  view: CalendarView = CalendarView.Month;
  // 套用CalendarView的設定
  CalendarView = CalendarView;
  // 設定日曆的當前日期，預設為Today
  viewDate: Date = new Date();
  // 切換日曆視圖到月、週、日
  setView(view: CalendarView) {
    this.view = view;
    this.checkForEventsOnActiveDay(); // 檢查當前日期是否有事件
  }
  // 預設語言為繁體中文
  locale: string = 'zh-Hant';
  // 用於存儲事件
  events: CalendarEvent[] = [];
  // 控制彈窗顯示
  displayModal: boolean = false;
  // 用於打開當前日期的事件視窗
  activeDayIsOpen: boolean = false;
  //更新日歷
  refresh = new Subject<void>();
  // 0 代表星期日, 6 代表星期六
  excludeDays: number[] = [0, 6];


  // 方法來檢查當前日期是否有事件
  checkForEventsOnActiveDay(): void {
    const hasEventOnActiveDay = this.events.some(event =>
      isSameDay(event.start, this.viewDate) // 檢查事件是否發生在 viewDate 當天
    );
    this.activeDayIsOpen = hasEventOnActiveDay; // 根據是否有事件來控制是否打開
  }

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

  // 事件操作按鈕
  actions: CalendarEventAction[] = [
    {
      label: '<i class="pi pi-pencil"></i>',
      a11yLabel: 'Edit',  // 無障礙標籤
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log('Edit action clicked', event);
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="pi pi-trash"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log('del action clicked', event);
        // this.events = this.events.filter((iEvent) => iEvent !== event); // 從事件列表中刪除事件
        this.deleteEvent(event); // 調用刪除事件的方法
      },
    },
  ];

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false; // 如果當天已打開或沒有事件，就關閉
      } else {
        this.activeDayIsOpen = true; // 否則打開
      }
      this.viewDate = date; // 更新當前日期
    }
  }

  modalData: ModalData = {
    action: '',
    event: {} as CalendarEvent,
    title: '',
    start: new Date(),
    end: new Date(),
  };

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {
      event,  // 傳遞要編輯的事件
      action, // 動作標籤
      title: event.title, // 當前事件的標題
      start: event.start || new Date(), // 當前事件的開始時間
      end: event.end || new Date()      // 當前事件的結束時間
    };
    this.displayModal = true;  // 打開彈出視窗
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),  // 預設當天開始
        end: endOfDay(new Date()),      // 預設當天結束
        color: colors['red'],           // 預設顏色為紅色
        actions: this.actions,          // 設置操作按鈕 (編輯、刪除)
        draggable: true,                // 支援拖曳功能

        // 原先用來防止彈跳視窗調整大小的,但改用primeng dailog,故先註解
        // resizable: prevent resizing of elements when not on top stack (4bfac45), closes #662
        // https://github.com/mattlewis92/angular-calendar/issues/662

        // resizable: {
        //   beforeStart: true,
        //   afterEnd: true,
        // },

      },
    ];
    this.activeDayIsOpen = true;        // 打開新增日期的事件視窗
  }

  updateEvent(): void {
    if (this.modalData) {
      const eventToUpdate = this.events.find(event => event === this.modalData?.event);
      if (eventToUpdate) {
        eventToUpdate.title = this.modalData.title;  // 更新標題
        eventToUpdate.start = this.modalData.start;  // 更新開始時間
        eventToUpdate.end = this.modalData.end;      // 更新結束時間
        this.refresh.next();                         // 觸發日曆更新
      }
      this.displayModal = false;                     // 關閉彈出視窗
    }
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete); // 刪除事件
  }

}
