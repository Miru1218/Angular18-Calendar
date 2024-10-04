import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableExternalEventsComponent } from './draggable-external-events.component';

describe('DraggableExternalEventsComponent', () => {
  let component: DraggableExternalEventsComponent;
  let fixture: ComponentFixture<DraggableExternalEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableExternalEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraggableExternalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
