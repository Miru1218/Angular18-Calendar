import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModeSwitcherComponent } from './view-mode-switcher.component';

describe('ViewModeSwitcherComponent', () => {
  let component: ViewModeSwitcherComponent;
  let fixture: ComponentFixture<ViewModeSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewModeSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewModeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
