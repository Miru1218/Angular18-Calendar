import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcludeWeekendsComponent } from './exclude-weekends.component';

describe('ExcludeWeekendsComponent', () => {
  let component: ExcludeWeekendsComponent;
  let fixture: ComponentFixture<ExcludeWeekendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcludeWeekendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcludeWeekendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
