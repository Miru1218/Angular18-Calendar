import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCrudCalendarComponent } from './event-crud-calendar.component';

describe('EventCrudCalendarComponent', () => {
  let component: EventCrudCalendarComponent;
  let fixture: ComponentFixture<EventCrudCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCrudCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCrudCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
