
import localeFr from '@angular/common/locales/fr';
import localeZhHant from '@angular/common/locales/zh-Hant';
import localeEn from '@angular/common/locales/en';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { CommonModule, registerLocaleData } from '@angular/common';
import {
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  CalendarModule as AngularCalendarModule, CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {
  addDays,
  addHours,
  endOfDay,
  endOfMonth,
  isSameDay,
  isSameMonth,
  startOfDay,

  subDays,
} from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModifyMonthStyleService } from './service/modify-month-style.service';
import { ModalData } from '../../shared/models/shared-calendar-event.model';

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

registerLocaleData(localeZhHant, 'zh-Hant');//繁體中文
registerLocaleData(localeFr);//法語
registerLocaleData(localeEn, 'en-US');//英文

@Component({
  selector: 'app-modify-month-style',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    AngularCalendarModule,
    PrimeNgCalendarModule
  ],
  templateUrl: './modify-month-style.component.html',
  styleUrl: './modify-month-style.component.scss'
})
export class ModifyMonthStyleComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  locale: string = 'zh-Hant';// 預設語言為繁體中文

  displayModal: boolean = false;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  daysInWeek = 7;

  datetime12h: Date[] | undefined;

  //更新標題、開始時間、結束時間
  refresh = new Subject<void>();

  private destroy$ = new Subject<void>();

  activeDayIsOpen: boolean = true;

  events: CalendarEvent[] = [];


  actions: CalendarEventAction[] = [
    {
      label: '<i class="pi pi-pencil"></i>',
      a11yLabel: 'Edit',
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
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.deleteEvent(event);
      },
    },
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private modifyMonthStyleService: ModifyMonthStyleService
  ) { }

  ngOnInit() {

    this.modifyMonthStyleService.getEvents().subscribe(events => {
      this.events = events.map((item: any) => {
        return {
          ...item,
          actions: this.actions,
        }
      });
      console.log(events);
    });

    const CALENDAR_RESPONSIVE = {
      small: {
        breakpoint: '(max-width: 576px)',
        daysInWeek: 2,
      },
      medium: {
        breakpoint: '(max-width: 768px)',
        daysInWeek: 3,
      },
      large: {
        breakpoint: '(max-width: 960px)',
        daysInWeek: 5,
      },
    };

    this.breakpointObserver
      .observe(
        Object.values(CALENDAR_RESPONSIVE).map(({ breakpoint }) => breakpoint)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(
          ({ breakpoint }) => !!state.breakpoints[breakpoint]
        );
        if (foundBreakpoint) {
          this.daysInWeek = foundBreakpoint.daysInWeek;
        } else {
          this.daysInWeek = 7;
        }
        this.cd.markForCheck();
      });

  }

  modalData: ModalData = {
    action: '',
    event: {} as CalendarEvent,
    title: '',
    start: new Date(),
    end: new Date(),
  };

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
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

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event);
    this.modalData = {
      event,
      action,
      title: event.title,
      start: event.start || new Date(),
      end: event.end || new Date()
    };
    this.displayModal = true;
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        actions: this.actions,
        draggable: true,
        // resizable: {
        //   beforeStart: true,
        //   afterEnd: true,
        // },
      },
    ];
  }

  updateEvent(): void {
    if (this.modalData) {
      const eventToUpdate = this.events.find(event => event === this.modalData?.event);
      if (eventToUpdate) {
        eventToUpdate.title = this.modalData.title;
        eventToUpdate.start = this.modalData.start;
        eventToUpdate.end = this.modalData.end;
        this.refresh.next();
      }
      this.displayModal = false;
    }
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

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  //關閉顯示行程
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
