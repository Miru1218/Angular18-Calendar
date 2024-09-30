import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMonthStyleComponent } from './modify-month-style.component';

describe('ModifyMonthStyleComponent', () => {
  let component: ModifyMonthStyleComponent;
  let fixture: ComponentFixture<ModifyMonthStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyMonthStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyMonthStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
